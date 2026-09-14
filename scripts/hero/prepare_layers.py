"""Prepare the /hero-lab photographic depth layers from one CC0 source photograph.

Source: "Unveiling the Serene Charm of a Nepali Village near Kavre. Far view across
hilltops." by Eagle Vision IT, WordPress Photo Directory, CC0 1.0 Universal.
https://wordpress.org/photos/photo/805643550b/

The script derives a relative depth proxy from atmospheric haze (luminance up,
saturation down with distance) plus frame position, grades the photograph toward the
project's cartographic-neutral palette, and exports soft-masked depth planes.

It also exports an isoline overlay traced from the smoothed relative-depth field. Those
lines are a tonal-depth study of this photograph. They are NOT elevation contours and
carry no metric value.

Run: python scripts/hero/prepare_layers.py
Requires: numpy, Pillow. Source photo under data/hero-source/ (git-ignored).
"""

from __future__ import annotations

import json
import pathlib

import numpy as np
from PIL import Image, ImageFilter

ROOT = pathlib.Path(__file__).resolve().parents[2]
SRC = ROOT / "data" / "hero-source" / "kavre-2048.jpg"
OUT = ROOT / "public" / "images" / "hero"

# Crop away the out-of-focus foreground branch on the left, which sits exactly where the
# typography safe area is. Values are source pixels.
CROP_LEFT = 430
# Working canvas. Sky is extended upward so the composition has a reading zone.
WIDTH = 1760
SKY_EXTRA = 300

# Palette anchors from docs/10-DECISIONS.md D-020.
SHADOW = np.array([0.106, 0.129, 0.118], np.float32)  # #1B211E
HIGHLIGHT = np.array([0.788, 0.812, 0.804], np.float32)  # near paper, cooled


def smoothstep(edge0: float, edge1: float, x: np.ndarray) -> np.ndarray:
    t = np.clip((x - edge0) / (edge1 - edge0), 0.0, 1.0)
    return t * t * (3 - 2 * t)


def band(depth: np.ndarray, lo: float, hi: float, feather: float) -> np.ndarray:
    """Soft alpha window over the depth field. Wide feather avoids cut-out edges."""
    return smoothstep(lo - feather, lo + feather, depth) * (
        1 - smoothstep(hi - feather, hi + feather, depth)
    )


def blur(a: np.ndarray, radius: float) -> np.ndarray:
    img = Image.fromarray((np.clip(a, 0, 1) * 255).astype(np.uint8))
    return np.asarray(img.filter(ImageFilter.GaussianBlur(radius))).astype(np.float32) / 255


def grade(rgb: np.ndarray) -> np.ndarray:
    """Cartographic-neutral grade: desaturate, cool slightly, map into graphite/paper."""
    lum = (rgb * np.array([0.2126, 0.7152, 0.0722], np.float32)).sum(-1, keepdims=True)
    out = lum + (rgb - lum) * 0.30  # keep a trace of natural colour, no false teal/gold
    out = SHADOW + out * (HIGHLIGHT - SHADOW)  # compress into the project's tonal range
    out = np.clip((out - 0.5) * 1.06 + 0.5, 0, 1)  # gentle contrast, no crushed blacks
    out[..., 2] += 0.012 * (1 - lum[..., 0])  # cool the shadows toward #5C7480
    return np.clip(out, 0, 1)


CORNERS = ((0, 0), (1, 0), (1, 1), (0, 1))
EDGES = ((0, 1), (1, 2), (3, 2), (0, 3))


def marching_squares(field: np.ndarray, level: float, step: int, clip_y: float) -> list[str]:
    """Minimal isoline tracer. Segments are chained into polylines to keep the SVG small."""
    f = field[::step, ::step]
    a, b, c, d = f[:-1, :-1], f[:-1, 1:], f[1:, 1:], f[1:, :-1]
    idx = ((a > level).astype(np.uint8) | ((b > level).astype(np.uint8) << 1)
           | ((c > level).astype(np.uint8) << 2) | ((d > level).astype(np.uint8) << 3))
    ys, xs = np.nonzero((idx > 0) & (idx < 15))

    links: dict[tuple[int, int], list[tuple[int, int]]] = {}
    for y, x in zip(ys.tolist(), xs.tolist()):
        v = (f[y, x], f[y, x + 1], f[y + 1, x + 1], f[y + 1, x])
        pts = []
        for i, j in EDGES:
            if (v[i] > level) != (v[j] > level):
                t = (level - v[i]) / (v[j] - v[i])
                p0, p1 = CORNERS[i], CORNERS[j]
                # Quantize to half-cells so shared edge crossings snap to one key.
                pts.append((round((x + p0[0] + t * (p1[0] - p0[0])) * 2),
                            round((y + p0[1] + t * (p1[1] - p0[1])) * 2)))
        for i in range(0, len(pts) - 1, 2):
            links.setdefault(pts[i], []).append(pts[i + 1])
            links.setdefault(pts[i + 1], []).append(pts[i])

    paths: list[str] = []
    seen: set[tuple[int, int]] = set()
    ends = [p for p, n in links.items() if len(n) == 1] + list(links)
    for start in ends:
        if start in seen:
            continue
        chain, node, prev = [start], start, None
        seen.add(start)
        while True:
            nxt = next((n for n in links[node] if n != prev and n not in seen), None)
            if nxt is None:
                break
            seen.add(nxt)
            chain.append(nxt)
            prev, node = node, nxt
        # Split on the sky clip so no line floats above the horizon, and drop speckle.
        s = step / 2
        run: list[str] = []
        for px, py in chain[::2]:
            if py * s < clip_y:
                if len(run) >= 11:
                    paths.append("M" + "L".join(run))
                run = []
                continue
            run.append(f"{px * s:.0f} {py * s:.0f}")
        if len(run) >= 11:
            paths.append("M" + "L".join(run))
    return paths


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    src = Image.open(SRC).convert("RGB")
    src = src.crop((CROP_LEFT, 0, src.width, src.height))
    scale = WIDTH / src.width
    src = src.resize((WIDTH, round(src.height * scale)), Image.LANCZOS)
    photo = np.asarray(src).astype(np.float32) / 255

    # --- relative depth proxy -------------------------------------------------
    mx, mn = photo.max(2), photo.min(2)
    lum = (photo * np.array([0.2126, 0.7152, 0.0722], np.float32)).sum(-1)
    sat = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1e-5), 0)
    haze = np.clip(lum * 0.85 + (1 - sat) * 0.55 - 0.25, 0, 1.6) / 1.6
    haze = blur(haze, 26)
    rows = np.linspace(0, 1, photo.shape[0], dtype=np.float32)[:, None]
    depth = 0.72 * haze + 0.28 * (1 - rows)
    depth = (depth - depth.min()) / (depth.max() - depth.min())

    graded = grade(photo)

    # Graduated darkening on the left, like a physical grad filter on the shaded side.
    # It creates the reading zone photographically instead of with a UI scrim.
    cols = np.linspace(0, 1, WIDTH, dtype=np.float32)[None, :, None]
    graded = graded * (1 - 0.62 * smoothstep(0.58, 0.0, cols))

    # --- extend the sky upward so typography has a reading zone ---------------
    h = photo.shape[0] + SKY_EXTRA
    top = graded[:6].mean(0)
    ramp = np.linspace(0, 1, SKY_EXTRA, dtype=np.float32)[:, None, None]
    sky_fill = top[None] * (0.90 + 0.10 * ramp) + np.array([0.03, 0.035, 0.04], np.float32) * (1 - ramp)
    canvas = np.concatenate([np.clip(sky_fill, 0, 1), graded], 0)
    depth_full = np.concatenate([np.ones((SKY_EXTRA, WIDTH), np.float32), depth], 0)

    # --- backdrop plate -------------------------------------------------------
    # Near content is blurred into haze so shifted crisp planes never read as a
    # doubled silhouette over it, and no plane can expose a hole.
    near = smoothstep(0.60, 0.22, depth_full)[..., None]
    soft = blur(canvas, 24)
    backdrop = canvas * (1 - near) + soft * near
    backdrop = backdrop * (1 - 0.22 * near) + np.array([0.55, 0.58, 0.58], np.float32) * 0.22 * near
    save(backdrop, None, "backdrop")

    planes = {
        "ridge": band(depth_full, 0.55, 0.86, 0.085),
        "terrain": band(depth_full, 0.28, 0.60, 0.075),
        "foreground": band(depth_full, -1.0, 0.32, 0.065),
    }
    boxes = {}
    for name, alpha in planes.items():
        boxes[name] = save(canvas, blur(alpha, 9), name)

    # --- isolines from the relative depth field (not elevation) ---------------
    field = blur(depth_full, 16)
    paths: list[str] = []
    for level in np.arange(0.14, 0.92, 0.095):
        paths.extend(marching_squares(field, float(level), step=4, clip_y=SKY_EXTRA + 200))
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {WIDTH} {h}" '
        f'width="{WIDTH}" height="{h}" fill="none" stroke="currentColor" '
        'stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round">'
        f'<path d="{"".join(paths)}"/></svg>'
    )
    (OUT / "isolines.svg").write_text(svg, encoding="utf-8")

    # --- mobile: one composed frame, no layer stack ---------------------------
    mob = Image.fromarray((np.clip(canvas, 0, 1) * 255).astype(np.uint8))
    mob = mob.crop((int(WIDTH * 0.22), 0, int(WIDTH * 0.86), h)).resize((780, int(h * 780 / (WIDTH * 0.64))), Image.LANCZOS)
    mob.save(OUT / "hero-mobile.webp", quality=78, method=6)

    (OUT / "source.json").write_text(json.dumps({
        "title": "Unveiling the Serene Charm of a Nepali Village near Kavre. Far view across hilltops.",
        "creator": "Eagle Vision IT",
        "source": "WordPress Photo Directory",
        "landingPage": "https://wordpress.org/photos/photo/805643550b/",
        "license": "CC0 1.0 Universal (public domain dedication)",
        "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
        "attributionRequired": False,
        "region": "Middle hills near Kavre, Bagmati Province, Nepal",
        "sourcePixels": [2048, 1073],
        "cropLeftPx": CROP_LEFT,
        "workingCanvas": [WIDTH, h],
        "skyExtensionPx": SKY_EXTRA,
        "planes": boxes,
        "isolines": "Traced from the smoothed relative-depth proxy of this photograph. Tonal depth study only; not elevation, not measured survey data.",
    }, indent=2) + "\n", encoding="utf-8")
    print("canvas", WIDTH, h)


def save(rgb: np.ndarray, alpha: np.ndarray | None, name: str) -> dict | None:
    """Write one plane. Alpha planes are cropped to their visible rows to save bytes."""
    data = (np.clip(rgb, 0, 1) * 255).astype(np.uint8)
    box = None
    if alpha is None:
        img = Image.fromarray(data, "RGB")
        img.save(OUT / f"{name}.webp", quality=72, method=6)
    else:
        a8 = (np.clip(alpha, 0, 1) * 255).astype(np.uint8)
        rows = np.nonzero(a8.max(1) > 2)[0]
        top, bottom = int(rows[0]), int(rows[-1]) + 1
        img = Image.fromarray(np.dstack([data[top:bottom], a8[top:bottom]]), "RGBA")
        img.save(OUT / f"{name}.webp", quality=55, method=6)
        box = {"top": top, "height": bottom - top}
    print(name, (OUT / f"{name}.webp").stat().st_size // 1024, "KB", box or "")
    return box


if __name__ == "__main__":
    main()
