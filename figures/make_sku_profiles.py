"""
Figure 1 of 2: the SKU demand profiles that make retail forecasting hard.

WHAT IT SHOWS
    One representative SKU per demand class, 112 days of daily sales, plus how
    many of the 300 SKUs sit in each class. The point is that most of the
    catalogue is intermittent, so a smooth curve cannot describe it.

TO EDIT
    - WINDOW       : how many days of history to draw
    - PICK         : "median" picks the class's median-volume SKU (stable),
                    "top" picks the highest-volume one
    - Any text in HEADLINE / SUBLINE / FOOTNOTE
    - Panel colours in TONE

TO RUN
    pip install pandas matplotlib pyarrow
    python figures/make_sku_profiles.py

OUTPUT
    assets/sku-profiles.png
"""

import pathlib

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import pandas as pd

from theme import ACCENT, INK, MUTED, apply

DATA = "/media/ashfaque/datas/ml_projects/retail-forecast-system"  # <- change if moved
OUT = pathlib.Path(__file__).resolve().parent.parent / "assets" / "sku-profiles.png"

WINDOW = 112
PICK = "median"  # or "top"
ORDER = ["smooth", "lumpy", "erratic", "intermittent"]
TONE = {"smooth": "#9AA7B4", "lumpy": "#B9A37E", "erratic": "#C58A6A", "intermittent": ACCENT}

HEADLINE = "Four demand profiles, one forecasting problem  ·  store CA_1, 300 SKUs"
SUBLINE = (
    "Only 15 SKUs sell on a steady daily rhythm. 222 are intermittent — "
    "a single sale every few days, with long silent gaps."
)


def main():
    train = pd.read_parquet(
        f"{DATA}/data/processed/train_filtered_ca1.parquet",
        columns=["item_id", "sales", "date"],
    )
    classes = pd.read_csv(f"{DATA}/results/sku_demand_classes.csv")
    counts = classes["class"].value_counts()

    fig, axes = plt.subplots(
        1,
        4,
        figsize=(12.4, 2.85),
        gridspec_kw=dict(wspace=0.22, left=0.045, right=0.995, top=0.80, bottom=0.15),
    )

    for ax, cls in zip(axes, ORDER):
        sub = classes[classes["class"] == cls]
        if PICK == "top":
            pick = sub.nlargest(1, "mean")
        else:
            pick = sub.iloc[(sub["mean"] - sub["mean"].median()).abs().argsort()[:1]]
        sku = pick["item_id"].iloc[0]
        series = (
            train[train["item_id"] == sku]
            .sort_values("date")["sales"]
            .astype("float64")
            .iloc[-WINDOW:]
            .values
        )
        sold = int((series > 0).sum())

        ax.bar(range(len(series)), series, width=1.0, color=TONE[cls], linewidth=0)
        ax.set_title(cls, loc="left", fontsize=9, color=INK, pad=16, fontweight="bold")
        ax.text(
            0, 1.045, f"{counts[cls]} of 300 SKUs",
            transform=ax.transAxes, fontsize=7.4, color=MUTED,
        )
        ax.text(
            1.0, 1.045,
            f"median {pick['adi'].iloc[0]:.1f} days/sale  ·  {sold}/{len(series)} days sold",
            transform=ax.transAxes, fontsize=7.4, color=MUTED, ha="right",
        )
        ax.set_ylim(0, max(series.max() * 1.30, 1))
        ax.set_xlim(-1, len(series))
        ax.set_yticks([])
        for side in ("top", "right", "left"):
            ax.spines[side].set_visible(False)
        ax.set_xticks([0, WINDOW // 2 - 1, WINDOW - 1])
        ax.set_xticklabels([f"{WINDOW} days ago", str(WINDOW // 2), "today"], fontsize=7.4)
        ax.tick_params(axis="x", length=0, pad=3)

    fig.text(0.045, 0.955, HEADLINE, fontsize=10, color=INK, va="center")
    fig.text(0.045, 0.885, SUBLINE, fontsize=8, color=MUTED, va="center")
    fig.savefig(OUT, dpi=190, bbox_inches="tight", pad_inches=0.14)
    print(f"wrote {OUT}")


if __name__ == "__main__":
    apply(plt.rcParams)
    main()
