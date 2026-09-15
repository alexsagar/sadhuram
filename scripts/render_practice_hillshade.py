"""Render the Engineering Practice terrain plate from the Copernicus DEM tile.

Source : data/terrain-source/nepal-crop.tif
         (Copernicus DEM GLO-30, tile Copernicus_DSM_COG_10_N27_00_E085_00_DEM,
          10 x 10 km over the Kavrepalanchok middle hills, 27.68N 85.49E)
Output : public/images/practice/practice-04-terrain{,-mobile}.webp

Attribution required on display: Produced using Copernicus WorldDEM-30
(c) DLR e.V. 2010-2014 and (c) Airbus Defence and Space GmbH 2014-2018,
provided under COPERNICUS by the European Union and ESA.

Run: python scripts/render_practice_hillshade.py
"""

import numpy as np
from PIL import Image

SRC = "data/terrain-source/nepal-crop.tif"
OUT = "public/images/practice/practice-04-terrain.webp"
OUT_MOBILE = "public/images/practice/practice-04-terrain-mobile.webp"

BLOCK_METRES = 10_000.0
AZIMUTH_DEG = 315.0
ALTITUDE_DEG = 45.0
UPSAMPLE = 4  # interpolate elevation, then shade: crisp ridges instead of a blurred image

PAPER = np.array([242, 241, 236])  # --background
INK = np.array([40, 48, 44])

dem = Image.open(SRC)
width, height = dem.size
surface = np.asarray(
    dem.resize((width * UPSAMPLE, height * UPSAMPLE), Image.BICUBIC), dtype=np.float64
)

resolution = BLOCK_METRES / (width * UPSAMPLE)
dz_dy, dz_dx = np.gradient(surface, resolution, resolution)
slope = np.arctan(np.hypot(dz_dx, dz_dy))
aspect = np.arctan2(-dz_dx, dz_dy)

azimuth, altitude = np.radians(AZIMUTH_DEG), np.radians(ALTITUDE_DEG)
shade = np.clip(
    np.sin(altitude) * np.cos(slope)
    + np.cos(altitude) * np.sin(slope) * np.cos(azimuth - aspect),
    0,
    1,
)

ink_weight = (0.14 + 0.86 * (1 - shade))[..., None]
elevation = (surface - surface.min()) / (surface.max() - surface.min())
relief = (PAPER * (1 - ink_weight) + INK * ink_weight) * (0.92 + 0.08 * elevation[..., None])

image = Image.fromarray(np.clip(relief, 0, 255).astype(np.uint8), "RGB")
image = image.resize((1600, round(1600 * height / width)), Image.LANCZOS)
image.save(OUT, "WEBP", quality=84, method=6)

mobile = image.copy()
mobile.thumbnail((820, 820), Image.LANCZOS)
mobile.save(OUT_MOBILE, "WEBP", quality=80, method=6)

print(f"{OUT} {image.size}")
print(f"{OUT_MOBILE} {mobile.size}")
print(f"elevation range: {surface.min():.1f} m to {surface.max():.1f} m")
