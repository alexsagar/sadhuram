"""Extract pure contour linework from Copernicus DEM contours for the hero parallax overlay.
Removes all text annotations, labels, and haloes, keeping only clean vector paths.
"""
import re
from pathlib import Path

src = Path("artifacts/archive/gis-handoff-experiment/public-gis-hero/contours.svg")
dst = Path("public/images/hero/contours-overlay.svg")

content = src.read_text(encoding="utf-8")

# Remove labels group
content = re.sub(r'<g id="contour-labels".*?</g>', '', content, flags=re.DOTALL)

# Style definition
new_style = """    <style>
      .intermediate-contour {
        stroke: var(--hero-contour, rgba(220, 226, 222, 0.55));
        stroke-width: 0.9;
        stroke-linejoin: round;
        stroke-linecap: round;
        fill: none;
      }
      .index-contour {
        stroke: var(--hero-contour-index, rgba(245, 248, 245, 0.85));
        stroke-width: 1.5;
        stroke-linejoin: round;
        stroke-linecap: round;
        fill: none;
      }
    </style>"""

content = re.sub(r'<style>.*?</style>', new_style, content, flags=re.DOTALL)

# Add aria-hidden and role to root svg tag if not present
content = re.sub(
    r'<svg ([^>]+)>',
    r'<svg \1 aria-hidden="true" role="presentation" preserveAspectRatio="none">',
    content,
    count=1
)

dst.write_text(content.strip() + "\n", encoding="utf-8")
print(f"Wrote {dst} ({dst.stat().st_size} bytes)")
