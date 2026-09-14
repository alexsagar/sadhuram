"""Generate real elevation contours and analytical hillshade from Copernicus DEM GLO-30.

Dataset: Copernicus DEM GLO-30 Public (AWS 2021 release)
Crop: 10 km x 10 km centered at (85.49°E, 27.68°N) in Kavre middle hills, Bagmati Province, Nepal.
CRS: EPSG:32645 (UTM Zone 45N)
Relief: 1,254.6 m to 2,155.0 m (EGM2008 datum)

Outputs:
- public/gis/hero/contours.svg (crisp vector isolines, 50m interval, 200m index)
- public/gis/hero/hillshade.webp (subtle editorial paper-toned relief)
- public/gis/hero/metadata.json (provenance, bounds, and technical metadata)

Run: python scripts/terrain/preprocess_contours.py
"""

from pathlib import Path
import json
import numpy as np
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parents[2]
INPUT_U16 = ROOT / "public" / "terrain" / "nepal.u16"
OUT_DIR = ROOT / "public" / "gis" / "hero"
OUT_DIR.mkdir(parents=True, exist_ok=True)

# Grid parameters
SIZE = 129
WIDTH_METERS = 10000.0
SPACING = WIDTH_METERS / (SIZE - 1)  # 78.125m

# SVG Canvas dimensions
VIEW_SIZE = 1000.0
SCALE = VIEW_SIZE / (SIZE - 1)

# Elevation contour levels
INTERVAL_MINOR = 50.0   # 50m minor contours
INTERVAL_INDEX = 200.0  # 200m index contours

def load_dem():
    raw = np.fromfile(INPUT_U16, dtype="<u2").reshape(SIZE, SIZE)
    heights = raw.astype(np.float32) / 10.0
    return heights

def trace_isolines(grid, level):
    """Standard marching squares contour segment generator."""
    h, w = grid.shape
    segments = []
    
    for r in range(h - 1):
        for c in range(w - 1):
            v0 = grid[r, c]         # top-left
            v1 = grid[r, c + 1]     # top-right
            v2 = grid[r + 1, c + 1] # bottom-right
            v3 = grid[r + 1, c]     # bottom-left
            
            # Bitmask
            idx = 0
            if v0 >= level: idx |= 1
            if v1 >= level: idx |= 2
            if v2 >= level: idx |= 4
            if v3 >= level: idx |= 8
            
            if idx == 0 or idx == 15:
                continue
            
            # Edge crossings (linear interpolation)
            # Edge 0: top (r, c) to (r, c+1)
            # Edge 1: right (r, c+1) to (r+1, c+1)
            # Edge 2: bottom (r+1, c) to (r+1, c+1)
            # Edge 3: left (r, c) to (r+1, c)
            pts = {}
            if (idx & 1) != (idx & 2):
                t = (level - v0) / (v1 - v0) if v1 != v0 else 0.5
                pts[0] = (c + t, r)
            if (idx & 2) != (idx & 4):
                t = (level - v1) / (v2 - v1) if v2 != v1 else 0.5
                pts[1] = (c + 1, r + t)
            if (idx & 8) != (idx & 4):
                t = (level - v3) / (v2 - v3) if v2 != v3 else 0.5
                pts[2] = (c + t, r + 1)
            if (idx & 1) != (idx & 8):
                t = (level - v0) / (v3 - v0) if v3 != v0 else 0.5
                pts[3] = (c, r + t)
                
            def add_seg(eA, eB):
                if eA in pts and eB in pts:
                    pA = (round(pts[eA][0] * SCALE, 1), round(pts[eA][1] * SCALE, 1))
                    pB = (round(pts[eB][0] * SCALE, 1), round(pts[eB][1] * SCALE, 1))
                    segments.append((pA, pB))

            if idx in (1, 14): add_seg(0, 3)
            elif idx in (2, 13): add_seg(0, 1)
            elif idx in (4, 11): add_seg(1, 2)
            elif idx in (8, 7): add_seg(2, 3)
            elif idx in (3, 12): add_seg(3, 1)
            elif idx in (6, 9): add_seg(0, 2)
            elif idx in (5, 10):
                # Saddle resolution: use center average
                center = (v0 + v1 + v2 + v3) / 4.0
                if (center >= level) == (idx == 5):
                    add_seg(0, 1); add_seg(2, 3)
                else:
                    add_seg(0, 3); add_seg(1, 2)

    return segments

def chain_segments(segments):
    """Chain unordered line segments into continuous polylines."""
    if not segments:
        return []
    
    # Adjacency map
    adj = {}
    for p1, p2 in segments:
        adj.setdefault(p1, []).append(p2)
        adj.setdefault(p2, []).append(p1)
        
    visited_edges = set()
    polylines = []
    
    # First chain endpoints (degree == 1)
    endpoints = [p for p, neighbors in adj.items() if len(neighbors) == 1]
    
    for start in endpoints:
        for nxt in adj[start]:
            edge = tuple(sorted((start, nxt)))
            if edge in visited_edges:
                continue
            path = [start, nxt]
            visited_edges.add(edge)
            curr = nxt
            while True:
                next_nodes = [n for n in adj[curr] if tuple(sorted((curr, n))) not in visited_edges]
                if not next_nodes:
                    break
                nxt = next_nodes[0]
                visited_edges.add(tuple(sorted((curr, nxt))))
                path.append(nxt)
                curr = nxt
            polylines.append(path)
            
    # Then chain remaining closed loops
    for start in adj:
        for nxt in adj[start]:
            edge = tuple(sorted((start, nxt)))
            if edge in visited_edges:
                continue
            path = [start, nxt]
            visited_edges.add(edge)
            curr = nxt
            while True:
                next_nodes = [n for n in adj[curr] if tuple(sorted((curr, n))) not in visited_edges]
                if not next_nodes:
                    break
                nxt = next_nodes[0]
                visited_edges.add(tuple(sorted((curr, nxt))))
                path.append(nxt)
                curr = nxt
            polylines.append(path)
            
    return polylines

def polylines_to_path_d(polylines, min_points=3):
    d_parts = []
    for poly in polylines:
        if len(poly) < min_points:
            continue
        d_parts.append(f"M{poly[0][0]:.1f},{poly[0][1]:.1f}" + "".join(f"L{x:.1f},{y:.1f}" for x, y in poly[1:]))
    return " ".join(d_parts)

def build_contours_svg(grid, interval_minor=INTERVAL_MINOR, interval_index=INTERVAL_INDEX):
    min_z = float(np.floor(grid.min() / interval_minor) * interval_minor)
    max_z = float(np.ceil(grid.max() / interval_minor) * interval_minor)
    
    levels = np.arange(min_z + interval_minor, max_z, interval_minor)
    
    index_paths = []
    intermediate_paths = []
    labels = []
    
    for z in levels:
        is_index = (round(z) % round(INTERVAL_INDEX) == 0)
        segs = trace_isolines(grid, z)
        polys = chain_segments(segs)
        path_d = polylines_to_path_d(polys)
        if not path_d:
            continue
            
        if is_index:
            index_paths.append(path_d)
            # Find a representative midpoint for index elevation label
            longest = max(polys, key=len) if polys else None
            if longest and len(longest) > 12:
                mid_pt = longest[len(longest) // 2]
                # Keep labels within protected margin
                if 80 < mid_pt[0] < 920 and 80 < mid_pt[1] < 920:
                    labels.append((int(z), mid_pt[0], mid_pt[1]))
        else:
            intermediate_paths.append(path_d)

    # Construct clean, grouped SVG
    index_combined = " ".join(index_paths)
    intermediate_combined = " ".join(intermediate_paths)
    
    svg = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {int(VIEW_SIZE)} {int(VIEW_SIZE)}" width="100%" height="100%" fill="none">',
        '  <defs>',
        '    <style>',
        '      .intermediate-contour { stroke: var(--contour, #9AA39E); stroke-width: 0.85; stroke-opacity: 0.65; fill: none; }',
        '      .index-contour { stroke: var(--contour-ink, #5F6561); stroke-width: 1.45; stroke-opacity: 0.95; fill: none; }',
        '      .contour-label { font-family: var(--font-mono, monospace); font-size: 11px; fill: var(--foreground-muted, #5F6561); letter-spacing: 0.04em; text-anchor: middle; dominant-baseline: central; }',
        '      .label-halo { stroke: var(--background, #F2F1EC); stroke-width: 3.5; stroke-linejoin: round; fill: var(--background, #F2F1EC); }',
        '    </style>',
        '  </defs>',
        '  <g id="intermediate-contours" class="intermediate-contours">',
        f'    <path class="intermediate-contour" d="{intermediate_combined}" />',
        '  </g>',
        '  <g id="index-contours" class="index-contours">',
        f'    <path class="index-contour" d="{index_combined}" />',
        '  </g>',
        '  <g id="contour-labels" class="contour-labels" aria-hidden="true">'
    ]
    
    # Deduplicate / space labels so they don't crowd
    filtered_labels = []
    for elev, x, y in labels:
        if all((x - ox)**2 + (y - oy)**2 > 140**2 for _, ox, oy in filtered_labels):
            filtered_labels.append((elev, x, y))
            svg.append(f'    <text x="{x:.1f}" y="{y:.1f}"><tspan class="label-halo">{elev}m</tspan><tspan class="contour-label">{elev}m</tspan></text>')
            
    svg.append('  </g>')
    svg.append('</svg>\n')
    
    return "\n".join(svg), len(index_paths), len(intermediate_paths), len(filtered_labels)

def generate_hillshade(grid):
    """Compute Lambertian shaded relief in cartographic paper tones."""
    # Compute surface slopes in meters
    dy, dx = np.gradient(grid, SPACING, SPACING)
    slope = np.arctan(np.sqrt(dx**2 + dy**2))
    aspect = np.arctan2(-dy, dx)
    
    # Solar illumination: Azimuth 315° (NW), Altitude 45°
    az = np.radians(315.0)
    alt = np.radians(45.0)
    
    hs = np.sin(alt) * np.cos(slope) + np.cos(alt) * np.sin(slope) * np.cos(az - aspect)
    hs = np.clip(hs, 0.0, 1.0)
    
    # Map illumination into Cartographic Neutral paper palette:
    # Highlights: Paper #F2F1EC [242, 241, 236]
    # Mid-flat: Secondary paper #E8E7E1 [232, 231, 225]
    # Shadows: Restrained slate-green shade [205, 212, 208]
    c_shadow = np.array([205, 212, 208], dtype=np.float32)
    c_paper = np.array([242, 241, 236], dtype=np.float32)
    
    # Smooth tonal curve
    t = hs[..., np.newaxis]
    rgb = (c_shadow + t * (c_paper - c_shadow)).astype(np.uint8)
    
    img = Image.fromarray(rgb, mode="RGB")
    # Resize with Bicubic interpolation to 1000 x 1000 for smooth rendering
    img = img.resize((1000, 1000), Image.Resampling.BICUBIC)
    # Gentle subtle blur to eliminate any 30m radar stepping
    img = img.filter(ImageFilter.GaussianBlur(1.2))
    
    out_path = OUT_DIR / "hillshade.webp"
    img.save(out_path, format="WEBP", quality=88, method=6)
    return out_path.stat().st_size

def main():
    print("Loading Copernicus DEM GLO-30 data...")
    dem = load_dem()
    print(f"Loaded elevation grid: shape={dem.shape}, min={dem.min():.1f}m, max={dem.max():.1f}m, relief={dem.max()-dem.min():.1f}m")
    
    print("Generating authentic vector contours (desktop: 50m interval)...")
    svg_content, n_idx, n_inter, n_labels = build_contours_svg(dem, interval_minor=50.0, interval_index=200.0)
    svg_path = OUT_DIR / "contours.svg"
    svg_path.write_text(svg_content, encoding="utf-8")
    svg_size = svg_path.stat().st_size
    print(f"Generated {svg_path.name}: {svg_size:,} bytes ({svg_size/1024:.1f} KB)")
    print(f"  Index levels: {n_idx}, Intermediate levels: {n_inter}, Elevation labels: {n_labels}")
    
    print("Generating lightweight vector contours for mobile (100m interval)...")
    svg_mob_content, n_m_idx, n_m_inter, n_m_labels = build_contours_svg(dem, interval_minor=100.0, interval_index=200.0)
    svg_mob_path = OUT_DIR / "contours-mobile.svg"
    svg_mob_path.write_text(svg_mob_content, encoding="utf-8")
    svg_mob_size = svg_mob_path.stat().st_size
    print(f"Generated {svg_mob_path.name}: {svg_mob_size:,} bytes ({svg_mob_size/1024:.1f} KB)")
    
    print("Generating cartographic paper hillshade...")
    hs_size = generate_hillshade(dem)
    print(f"Generated hillshade.webp: {hs_size:,} bytes ({hs_size/1024:.1f} KB)")
    
    metadata = {
        "dataset": "Copernicus DEM GLO-30 Public (AWS 2021 release)",
        "source": "https://copernicus-dem-30m.s3.amazonaws.com/Copernicus_DSM_COG_10_N27_00_E085_00_DEM/Copernicus_DSM_COG_10_N27_00_E085_00_DEM.tif",
        "license": "Copernicus WorldDEM-30 © DLR e.V. 2010-2014 and © Airbus Defence and Space GmbH 2014-2018 provided under COPERNICUS by the European Union and ESA; all rights reserved",
        "licenseUrl": "https://documentation.dataspace.copernicus.eu/APIs/SentinelHub/Data/DEM/resources/license/License-COPDEM-30.pdf",
        "provenanceClassification": "REGIONAL",
        "geographicRegion": "Kavrepalanchok District middle hills, Bagmati Province, Nepal",
        "centerCoordinates": [85.49, 27.68],
        "geographicBoundsWGS84": [85.43867, 27.63432, 85.54129, 27.72567],
        "projectedCRS": "EPSG:32645 (UTM Zone 45N)",
        "verticalDatum": "EGM2008",
        "extentMeters": [10000, 10000],
        "minElevationMeters": float(dem.min()),
        "maxElevationMeters": float(dem.max()),
        "reliefMeters": float(dem.max() - dem.min()),
        "contourIntervalMinorMeters": INTERVAL_MINOR,
        "contourIntervalIndexMeters": INTERVAL_INDEX,
        "solarIllumination": {"azimuthDegrees": 315.0, "altitudeDegrees": 45.0},
        "assets": {
            "contoursSvgBytes": svg_size,
            "hillshadeWebpBytes": hs_size,
            "totalIncrementalBytes": svg_size + hs_size
        }
    }
    
    meta_path = OUT_DIR / "metadata.json"
    meta_path.write_text(json.dumps(metadata, indent=2) + "\n", encoding="utf-8")
    print(f"Generated {meta_path.name}: {meta_path.stat().st_size} bytes")
    print(f"Total incremental GIS asset payload: {(svg_size + hs_size)/1024:.1f} KB (Budget: <= 150 KB desktop)")

if __name__ == "__main__":
    main()
