"""Render the Open Graph / Twitter social-share card at 1200x630.

Stage 6 (polish): replaces the profile_img.jpg stopgap that Stages 2 and 4
were using for og:image / twitter:image across all four pages.

Why a script and not a static asset:
- Re-runnable. Tweak the design here, re-run, the asset rebuilds deterministically.
- No design tool dependency. Lives next to the code, reviewable in diff.
- Same pattern as scripts/optimize_images.py from Stage 4.

Run from the project root:
    python scripts/build_og_card.py

Writes assets/og-card.png (1200x630, ~50 KB).

Font resolution: tries Inter (if installed via Google Fonts → Windows Fonts),
then Segoe UI (default on Windows 11), then DejaVu Sans (Pillow's bundled
fallback). Output renders identically regardless of which falls through —
the design uses one weight pair (regular + bold) and no exotic glyphs.
"""

from __future__ import annotations

import sys
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    sys.stderr.write(
        "Pillow is required. Install with: pip install Pillow\n"
    )
    sys.exit(1)

# ---------------------------------------------------------------------------
# Palette — mirrors js/tailwind-config.js. Keep these in sync.
# ---------------------------------------------------------------------------
DEEP_BLUE   = "#213448"
MUTED_BLUE  = "#547792"
ACCENT_BLUE = "#94B4C1"
WARM_LIGHT  = "#EAE0CF"
PAPER_WHITE = "#F9F7F2"

# Canvas
WIDTH  = 1200
HEIGHT = 630

OUTPUT = Path(__file__).resolve().parent.parent / "assets" / "og-card.png"


# ---------------------------------------------------------------------------
# Font loading
# ---------------------------------------------------------------------------
def _candidate_paths(family: str) -> list[Path]:
    """Return likely font locations across OSes, in preference order."""
    # Inter ships from Google Fonts; user may have installed it system-wide.
    inter_names = {
        "regular": ["Inter-Regular.ttf", "Inter Regular.ttf"],
        "bold":    ["Inter-Bold.ttf",    "Inter Bold.ttf"],
    }
    segoe_names = {
        "regular": ["segoeui.ttf"],
        "bold":    ["segoeuib.ttf"],
    }
    dejavu_names = {
        "regular": ["DejaVuSans.ttf"],
        "bold":    ["DejaVuSans-Bold.ttf"],
    }

    families = {
        "Inter":     inter_names[family],
        "Segoe UI":  segoe_names[family],
        "DejaVu":    dejavu_names[family],
    }

    roots = [
        Path("C:/Windows/Fonts"),
        Path.home() / "AppData/Local/Microsoft/Windows/Fonts",
        Path("/Library/Fonts"),
        Path("/usr/share/fonts"),
    ]

    out: list[Path] = []
    for _fam, names in families.items():
        for name in names:
            for root in roots:
                out.append(root / name)
    return out


def load_font(family: str, size: int) -> ImageFont.FreeTypeFont:
    """Best-effort font loader. Falls through to Pillow's default bitmap font."""
    for path in _candidate_paths(family):
        if path.exists():
            try:
                return ImageFont.truetype(str(path), size=size)
            except OSError:
                continue
    # Last resort — guaranteed to exist but renders fixed-size.
    return ImageFont.load_default()


# ---------------------------------------------------------------------------
# Drawing
# ---------------------------------------------------------------------------
def render() -> Image.Image:
    img = Image.new("RGB", (WIDTH, HEIGHT), DEEP_BLUE)
    draw = ImageDraw.Draw(img)

    # Soft accent gradient in the bottom-right — drawn as concentric arcs of
    # decreasing alpha. Keeps the right side of the card from looking empty
    # without competing with the headline.
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    odraw = ImageDraw.Draw(overlay)
    cx, cy = WIDTH + 80, HEIGHT + 80
    for r in range(900, 200, -60):
        # Convert hex accent → rgba with low alpha; outer rings darker.
        alpha = int(8 + (900 - r) * 0.05)
        odraw.ellipse(
            [cx - r, cy - r, cx + r, cy + r],
            outline=(148, 180, 193, alpha),  # accentBlue, faint
            width=2,
        )
    img.paste(overlay, (0, 0), overlay)
    draw = ImageDraw.Draw(img)  # rebind after paste

    # Fonts
    font_brand   = load_font("bold",    34)
    font_name    = load_font("bold",   100)
    font_role    = load_font("regular", 44)
    font_tagline = load_font("regular", 30)
    font_url     = load_font("regular", 22)

    PAD = 70

    # Top-left brand mark: "EI ·" — pays homage to the navbar's logo canvas.
    brand_x = PAD
    brand_y = PAD
    draw.text((brand_x, brand_y), "EI", font=font_brand, fill=WARM_LIGHT)
    # Accent dot to the right of "EI"
    try:
        bbox = draw.textbbox((brand_x, brand_y), "EI", font=font_brand)
        ei_right = bbox[2]
        ei_mid_y = (bbox[1] + bbox[3]) // 2
    except AttributeError:
        # Pillow < 9.2 fallback
        ei_right = brand_x + font_brand.getsize("EI")[0]
        ei_mid_y = brand_y + font_brand.getsize("EI")[1] // 2
    dot_r = 7
    draw.ellipse(
        [ei_right + 14, ei_mid_y - dot_r,
         ei_right + 14 + dot_r * 2, ei_mid_y + dot_r],
        fill=ACCENT_BLUE,
    )

    # Centered name + role block, left-aligned.
    name_x = PAD
    name_y = 220
    draw.text((name_x, name_y), "Ekomobong Iwatt", font=font_name, fill=WARM_LIGHT)

    # Underline accent bar — same gesture as the hero heading on index.html.
    draw.rectangle(
        [name_x, name_y + 130, name_x + 80, name_y + 138],
        fill=ACCENT_BLUE,
    )

    role_y = name_y + 165
    draw.text((name_x, role_y), "Software Engineer", font=font_role, fill=ACCENT_BLUE)

    tagline_y = role_y + 60
    draw.text(
        (name_x, tagline_y),
        "Computer Engineering · University of Lagos",
        font=font_tagline,
        fill=WARM_LIGHT,
    )

    # Bottom: URL.
    url_text = "ekomiwatt.github.io/Portfolio-Website"
    try:
        bbox = draw.textbbox((0, 0), url_text, font=font_url)
        url_h = bbox[3] - bbox[1]
    except AttributeError:
        url_h = font_url.getsize(url_text)[1]
    draw.text((PAD, HEIGHT - PAD - url_h), url_text, font=font_url, fill=MUTED_BLUE)

    return img


def main() -> None:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    img = render()
    # `optimize=True` shrinks PNG by recompressing palette tables.
    img.save(OUTPUT, format="PNG", optimize=True)
    size_kb = OUTPUT.stat().st_size / 1024
    print(f"wrote {OUTPUT.relative_to(OUTPUT.parent.parent)} "
          f"({WIDTH}x{HEIGHT}, {size_kb:.1f} KB)")


if __name__ == "__main__":
    main()
