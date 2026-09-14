"""Offline Copernicus crop. Run: python scripts/terrain/preprocess.py
Local processor: python -m pip install --target .terrain-tools rasterio==1.4.3
Only the window's COG blocks are read; no full source tile is downloaded.
"""
from pathlib import Path
import sys
import json
import hashlib
import urllib.request

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / '.terrain-tools'))
import numpy as np
import rasterio
from rasterio.windows import from_bounds
from rasterio.warp import transform, transform_bounds, reproject, Resampling
from rasterio.transform import from_origin

TILE = 'Copernicus_DSM_COG_10_N27_00_E085_00_DEM'
URL = f'https://copernicus-dem-30m.s3.amazonaws.com/{TILE}/{TILE}.tif'
# Middle hills east of Kathmandu; a 10 km metric crop, no national outline.
CENTER = (85.49, 27.68)
WIDTH = 10000
SIZE = 129

def main():
    source_dir = ROOT / 'data/terrain-source'
    output = ROOT / 'public/terrain'
    source_dir.mkdir(parents=True, exist_ok=True)
    output.mkdir(parents=True, exist_ok=True)
    cx, cy = transform('EPSG:4326', 'EPSG:32645', [CENTER[0]], [CENTER[1]])
    west, south = cx[0] - WIDTH/2, cy[0] - WIDTH/2
    bounds = transform_bounds('EPSG:32645', 'EPSG:4326', west-150, south-150, west+WIDTH+150, south+WIDTH+150)
    original = source_dir / 'nepal-source-window.tif'
    if not original.exists():
        with rasterio.Env(GDAL_DISABLE_READDIR_ON_OPEN='EMPTY_DIR', CPL_VSIL_CURL_ALLOWED_EXTENSIONS='.tif'):
            with rasterio.open('/vsicurl/' + URL) as src:
                window = from_bounds(*bounds, src.transform).round_offsets().round_lengths()
                crop = src.read(1, window=window)
                profile = src.profile.copy()
                profile.update(width=crop.shape[1], height=crop.shape[0], transform=src.window_transform(window), tiled=False, blockxsize=crop.shape[1], blockysize=1)
                with rasterio.open(original, 'w', **profile) as dest:
                    dest.write(crop, 1)
    # Pixel centres are the mesh vertices: inclusive endpoints, 78.125 m spacing.
    spacing = WIDTH/(SIZE-1)
    dst_transform = from_origin(west-spacing/2, south+WIDTH+spacing/2, spacing, spacing)
    heights = np.full((SIZE,SIZE), np.nan, dtype='float32')
    with rasterio.open(original) as src:
        reproject(rasterio.band(src,1), heights, src_transform=src.transform, src_crs=src.crs,
                  dst_transform=dst_transform, dst_crs='EPSG:32645', dst_nodata=np.nan, resampling=Resampling.bilinear)
    assert np.isfinite(heights).all(), 'Crop contains missing elevations; do not invent replacements'
    assert 0 < float(heights.min()) < float(heights.max()) < 9000
    # Decimetre quantization retains source elevations (not normalized fake metres).
    encoded = np.rint(heights*10).astype('<u2')
    assert np.max(np.abs(encoded.astype(float)/10-heights)) <= .051
    (output/'nepal.u16').write_bytes(encoded.tobytes())
    request = urllib.request.Request(URL, method='HEAD')
    with urllib.request.urlopen(request) as response:
        tile_bytes = int(response.headers['Content-Length'])
    metadata = dict(dataset='Copernicus DEM GLO-30 Public (AWS 2021 release)', source=URL,
        originalTileBytes=tile_bytes, cropBytes=original.stat().st_size, center=CENTER,
        geographicBounds=list(transform_bounds('EPSG:32645', 'EPSG:4326', west, south, west+WIDTH, south+WIDTH)), crs='EPSG:32645',
        verticalDatum='EGM2008', projectedBounds=[west,south,west+WIDTH,south+WIDTH],
        widthMeters=WIDTH, size=SIZE, spacingMeters=spacing, metersPerUnit=.1,
        minElevation=float(encoded.min()/10), maxElevation=float(encoded.max()/10),
        sha256=hashlib.sha256(encoded.tobytes()).hexdigest(), sourceCropSha256=hashlib.sha256(original.read_bytes()).hexdigest(),
        sourceResolution='1 arc-second (~30m)', verticalExaggeration=1.2,
        license='https://documentation.dataspace.copernicus.eu/APIs/SentinelHub/Data/DEM/resources/license/License-COPDEM-30.pdf')
    (output/'nepal.json').write_text(json.dumps(metadata,indent=2)+'\n',encoding='utf-8')
    print(json.dumps(metadata,indent=2))

if __name__ == '__main__':
    main()
