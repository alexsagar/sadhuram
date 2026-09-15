"""
Generate an authentic Nepal middle hills (Kavre region) camera glide video
for the /hero-video-lab prototype.

Source assets:
- data/hero-source/kavre-2048.jpg
- public/images/hero/backdrop.webp
- public/images/hero/ridge.webp
- public/images/hero/terrain.webp
- public/images/hero/foreground.webp
License: CC0 1.0 Universal (Eagle Vision IT)

Output assets:
- public/media/hero-video/nepal-landscape.mp4 (Desktop: 1600x900, H.264, GOP=5, faststart)
- public/media/hero-video/nepal-landscape-mobile.mp4 (Mobile: 960x540, H.264, GOP=5, faststart)
- public/media/hero-video/poster.webp (Desktop poster: 1600x900)
- public/media/hero-video/poster-mobile.webp (Mobile poster: 960x540)
- public/media/hero-video/foreground.webp (Transparent foreground cutout matching final frame)
"""

import math
import subprocess
from pathlib import Path
from PIL import Image

def smoothstep(edge0, edge1, x):
    t = max(0.0, min(1.0, (x - edge0) / (edge1 - edge0)))
    return t * t * (3.0 - 2.0 * t)

def main():
    root = Path(r"D:\sadhuram")
    hero_dir = root / "public" / "images" / "hero"
    out_dir = root / "public" / "media" / "hero-video"
    out_dir.mkdir(parents=True, exist_ok=True)

    print("Loading source photographic layers...")
    backdrop = Image.open(hero_dir / "backdrop.webp").convert("RGBA") # (1760, 1467)
    ridge = Image.open(hero_dir / "ridge.webp").convert("RGBA")       # (1760, 683)
    terrain = Image.open(hero_dir / "terrain.webp").convert("RGBA")   # (1760, 928)
    foreground = Image.open(hero_dir / "foreground.webp").convert("RGBA") # (1760, 834)

    # Base positions in 1760x1467 canvas:
    # ridge top: 280
    # terrain top: 434
    # foreground top: 633

    # Output video specifications:
    # Desktop: 1600x900, 30 fps, 6.0 seconds = 180 frames
    width, height = 1600, 900
    fps = 30
    duration_sec = 6.0
    total_frames = int(fps * duration_sec)

    # Camera movement strategy:
    # Slow, majestic forward camera travel through the Himalayan middle hills.
    # At t=0: Camera starts slightly higher & wider, looking into the valley.
    # From t=0 -> t=end:
    # Parallax translation and subtle scale expansion simulate slow drone descent/forward glide.
    # At t=end: The layers arrive smoothly at the exact composition matching foreground.webp.

    ffmpeg_cmd = [
        "ffmpeg",
        "-y",
        "-f", "rawvideo",
        "-vcodec", "rawvideo",
        "-s", f"{width}x{height}",
        "-pix_fmt", "rgba",
        "-r", str(fps),
        "-i", "-",
        "-c:v", "libx264",
        "-preset", "medium",
        "-crf", "20",
        "-g", "6",                # Keyframe every 6 frames for instant, lag-free scrub seek
        "-keyint_min", "3",
        "-sc_threshold", "0",     # Disable scene detection keyframes
        "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        str(out_dir / "nepal-landscape.mp4")
    ]

    print(f"Encoding desktop video ({width}x{height}, {total_frames} frames)...")
    proc = subprocess.Popen(ffmpeg_cmd, stdin=subprocess.PIPE)

    poster_img = None
    final_frame_img = None

    # Source crop setup:
    # Base canvas is 1760 wide. In 1600x900, we sample a window with aspect ratio 16:9.
    # Canvas working area: (1760, 1467)
    # We want the window to cover the upper sky (top ~120) down to the foreground bottom.
    
    for i in range(total_frames):
        # Progress 0.0 -> 1.0 with smooth easing (starts calm, glides forward, settles calmly)
        t = i / (total_frames - 1)
        ease = smoothstep(0.0, 1.0, t)
        
        # Inverted progress: at t=0 we are at start offset, at t=1 we are at final resting position (0 offset)
        p = 1.0 - ease

        # Canvas composition for this frame:
        canvas = Image.new("RGBA", (1760, 1467), (18, 23, 21, 255))
        
        # Backdrop: subtle vertical drift
        # Final y=0, start y = -35
        bk_y = int(round(-35 * p))
        canvas.alpha_composite(backdrop, (0, bk_y))

        # Ridge: top=280 at final, start y = 280 - 55
        rd_y = int(round(280 - 55 * p))
        canvas.alpha_composite(ridge, (0, rd_y))

        # Terrain: top=434 at final, start y = 434 - 80
        tr_y = int(round(434 - 80 * p))
        canvas.alpha_composite(terrain, (0, tr_y))

        # Foreground: top=633 at final, start y = 633 - 120
        fg_y = int(round(633 - 120 * p))
        canvas.alpha_composite(foreground, (0, fg_y))

        # Crop to 16:9 frame:
        # At final (p=0): crop x from 80 to 1680 (width 1600), y from 300 to 1200 (height 900)
        # At start (p=1): slight camera tilt up (y from 240 to 1140)
        crop_y = int(round(300 - 60 * p))
        crop_x = 80
        frame = canvas.crop((crop_x, crop_y, crop_x + width, crop_y + height))

        proc.stdin.write(frame.tobytes())

        if i == 0:
            poster_img = frame.copy()
        if i == total_frames - 1:
            final_frame_img = frame.copy()

    proc.stdin.close()
    proc.wait()
    print("Desktop video encoded successfully!")

    # Save Desktop Poster (WebP)
    print("Saving desktop poster...")
    poster_img.convert("RGB").save(out_dir / "poster.webp", "WEBP", quality=85)

    # Also save the transparent foreground cutout corresponding exactly to the final frame crop!
    # Foreground on canvas is at (0, 633).
    # Final frame crop is: crop_x=80, crop_y=300, width=1600, height=900.
    # In this crop coordinate system:
    # Foreground top is: 633 - 300 = 333px from top of 900px frame!
    print("Generating pixel-perfect foreground cutout for the 1600x900 stage...")
    fg_canvas = Image.new("RGBA", (1760, 1467), (0, 0, 0, 0))
    fg_canvas.alpha_composite(foreground, (0, 633))
    fg_cutout = fg_canvas.crop((80, 300, 80 + width, 300 + height))
    fg_cutout.save(out_dir / "foreground.webp", "WEBP", quality=90)

    # Encode Mobile Video (960x540)
    print("Encoding mobile video (960x540)...")
    mobile_cmd = [
        "ffmpeg",
        "-y",
        "-i", str(out_dir / "nepal-landscape.mp4"),
        "-vf", "scale=960:540",
        "-c:v", "libx264",
        "-preset", "medium",
        "-crf", "22",
        "-g", "6",
        "-keyint_min", "3",
        "-sc_threshold", "0",
        "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        str(out_dir / "nepal-landscape-mobile.mp4")
    ]
    subprocess.run(mobile_cmd, check=True)
    print("Mobile video encoded successfully!")

    # Save Mobile Poster
    poster_mobile = poster_img.resize((960, 540), Image.Resampling.LANCZOS)
    poster_mobile.convert("RGB").save(out_dir / "poster-mobile.webp", "WEBP", quality=82)

    # Save Mobile Foreground Cutout
    fg_mobile = fg_cutout.resize((960, 540), Image.Resampling.LANCZOS)
    fg_mobile.save(out_dir / "foreground-mobile.webp", "WEBP", quality=85)

    # Also generate WebM versions as recommended in Section 10
    print("Encoding WebM (VP9) desktop asset...")
    webm_cmd = [
        "ffmpeg",
        "-y",
        "-i", str(out_dir / "nepal-landscape.mp4"),
        "-c:v", "libvpx-vp9",
        "-crf", "28",
        "-b:v", "0",
        "-g", "6",
        str(out_dir / "nepal-landscape.webm")
    ]
    subprocess.run(webm_cmd, check=True)
    print("WebM encoded successfully!")

    print("\n--- Summary of Generated Assets ---")
    for f in out_dir.iterdir():
        print(f"  {f.name}: {f.stat().st_size / 1024:.1f} KB")

if __name__ == "__main__":
    main()
