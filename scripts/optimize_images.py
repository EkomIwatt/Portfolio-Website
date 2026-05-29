"""Generate responsive WebP + JPEG siblings of the site's large image assets.

Run from the repo root:
    python scripts/optimize_images.py

Re-running is safe: outputs are deterministic and overwrite themselves.
Originals are never modified — they stay under assets/ for git history and
as fallbacks if a browser doesn't accept WebP.

Add a new source by appending to SOURCES below.
"""
from __future__ import annotations

import os
from pathlib import Path
from PIL import Image

REPO = Path(__file__).resolve().parent.parent
ASSETS = REPO / "assets"

# Each tuple: (source filename, list of (width, jpeg-quality, webp-quality) targets)
# The width is the longest side; aspect ratio is preserved.
SOURCES = [
    ("image1.jpg",   [(1600, 82, 80), (800, 80, 78)]),
    ("project1.png", [(1200, 85, 82), (768, 82, 80)]),
]


def resize_longest(im: Image.Image, target: int) -> Image.Image:
    """Resize so the longest side is `target` px (skip if already smaller)."""
    longest = max(im.size)
    if longest <= target:
        return im.copy()
    scale = target / longest
    new_size = (round(im.size[0] * scale), round(im.size[1] * scale))
    return im.resize(new_size, Image.LANCZOS)


def kb(path: Path) -> str:
    return f"{path.stat().st_size / 1024:.0f} KB"


def process(src_name: str, targets: list[tuple[int, int, int]]) -> None:
    src = ASSETS / src_name
    if not src.exists():
        print(f"  SKIP {src_name} (not found)")
        return

    stem = src.stem
    with Image.open(src) as im:
        # Flatten transparency to white for JPEG, keep RGBA for WebP.
        rgb = im.convert("RGB")
        rgba = im.convert("RGBA") if im.mode in ("RGBA", "LA", "P") else None

        print(f"  {src_name}  source: {im.size}  {kb(src)}")
        for width, jpg_q, webp_q in targets:
            resized_rgb = resize_longest(rgb, width)
            jpg_out = ASSETS / f"{stem}-w{width}.jpg"
            resized_rgb.save(jpg_out, "JPEG", quality=jpg_q, optimize=True, progressive=True)

            resized_for_webp = resize_longest(rgba or rgb, width)
            webp_out = ASSETS / f"{stem}-w{width}.webp"
            resized_for_webp.save(webp_out, "WEBP", quality=webp_q, method=6)

            print(f"    -> {jpg_out.name:30s} {kb(jpg_out)}")
            print(f"    -> {webp_out.name:30s} {kb(webp_out)}")


def main() -> None:
    print(f"Optimizing assets in {ASSETS}")
    for src_name, targets in SOURCES:
        process(src_name, targets)
    print("Done.")


if __name__ == "__main__":
    main()
