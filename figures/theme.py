"""
Shared look for every figure on the site, so they stay consistent.

Change the colours here and all figures follow.
"""

PAPER = "#FAFAFA"   # page background
INK = "#111111"     # primary text / actual data
MUTED = "#8C8C8C"   # secondary text / axis labels
GRID = "#E5E5E5"    # gridlines
ACCENT = "#1A4C8B"  # the number you want the eye to land on
BAR = "#CFCFCF"     # comparison bars that lost

# DejaVu Sans Mono ships with matplotlib, so the figures never need a font install.
# Swap to "Inter" and install it if you prefer the site font here.
FONT = "DejaVu Sans Mono"


def apply(rc):
    rc.update(
        {
            "font.family": FONT,
            "font.size": 9.5,
            "axes.edgecolor": "#D4D4D4",
            "axes.linewidth": 0.7,
            "text.color": INK,
            "axes.labelcolor": MUTED,
            "xtick.color": MUTED,
            "ytick.color": MUTED,
            "xtick.labelsize": 8.5,
            "ytick.labelsize": 8.5,
            "figure.facecolor": PAPER,
            "axes.facecolor": PAPER,
            "savefig.facecolor": PAPER,
        }
    )
    return rc
