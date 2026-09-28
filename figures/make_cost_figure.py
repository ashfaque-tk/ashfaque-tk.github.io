"""
Figure 2 of 2: what the selected forecast actually saved.

WHAT IT SHOWS
    Left  - aggregate daily demand against the forecast that was selected,
            over the blind holdout.
    Right - total inventory cost for every candidate model, all scored under
            one identical replenishment policy, with the selected model
            highlighted and the saving annotated.

THE NUMBERS ARE NOT TYPED IN
    Both panels are read from the holdout artifacts, so re-running after new
    data changes the chart and the delta automatically.

TO EDIT
    - LABEL / NOTE  : the model names and the annotation wording
    - SELECTED      : which model to highlight
    - Any headline text

TO RUN
    pip install pandas matplotlib pyarrow
    python figures/make_cost_figure.py

OUTPUT
    assets/m5-holdout.png
"""

import glob
import pathlib

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import pandas as pd
from matplotlib.ticker import FuncFormatter

from theme import ACCENT, BAR, GRID, INK, MUTED, apply

DATA = "/media/ashfaque/datas/ml_projects/retail-forecast-system"  # <- change if moved
OUT = pathlib.Path(__file__).resolve().parent.parent / "assets" / "m5-holdout.png"

SELECTED = "lgbm"           # the model highlighted in the cost chart
BASELINE = "seasonal_moving_average"  # what the delta is measured against

LABEL = {
    "lgbm": "LightGBM forecast",
    "simple_moving_average": "Simple moving average",
    "seasonal_moving_average": "Seasonal moving average",
    "seasonal_naive": "Seasonal naive",
    "croston_sba": "Croston-SBA",
    "croston": "Croston",
}
NOTE = "vs. the seasonal moving average the team would have used"


def load(pattern):
    return pd.read_parquet(sorted(glob.glob(f"{DATA}/results/tests/{pattern}"))[-1])


def main():
    preds, inv = load("test_preds-*.parquet"), load("test_inventory-*.parquet")
    for frame in (preds, inv):
        frame["item_id"] = frame["item_id"].astype(str)
        frame["date"] = pd.to_datetime(frame["date"])

    truth = preds[preds["model"] == BASELINE].groupby("date")["real_sales"].sum().sort_index()
    forecast = preds[preds["model"] == SELECTED].groupby("date")["sales_pred"].sum().sort_index()

    cost = {}
    for model, rows in inv.groupby("model"):
        per_sku = rows.groupby("item_id", observed=True).agg(
            holding=("holding_cost", "sum"), stockout=("stockout_cost", "sum")
        )
        cost[model] = float(per_sku["holding"].sum() + per_sku["stockout"].sum())

    order = sorted(cost, key=lambda k: -cost[k])
    values = [cost[m] for m in order]
    scale = max(cost.values())
    saved = cost[BASELINE] - cost[SELECTED]

    fig, (ax_left, ax_right) = plt.subplots(
        1, 2, figsize=(13.4, 3.6),
        gridspec_kw=dict(
            width_ratios=[1.4, 1], wspace=0.25,
            left=0.042, right=0.995, top=0.755, bottom=0.14,
        ),
    )

    days = range(len(truth))
    ax_left.plot(days, truth.values, color=INK, lw=1.9, label="Actual demand", zorder=3)
    ax_left.plot(
        days, forecast.values, color=ACCENT, lw=1.7, ls=(0, (4.5, 2.6)),
        label="Forecast I selected", zorder=4,
    )
    ax_left.set_title(
        f"{len(truth)}-day blind holdout  ·  {truth.index[0]:%d %b}–{truth.index[-1]:%d %b %Y}",
        loc="left", fontsize=10, color=INK, pad=20,
    )
    ax_left.text(0, 1.05, "FORECAST vs REALITY", transform=ax_left.transAxes, fontsize=8, color=ACCENT, va="bottom")
    ax_left.set_ylabel("units / day", fontsize=8.5)
    ax_left.set_xticks(list(days)[::7])
    ax_left.set_xticklabels([d.strftime("%d %b") for d in truth.index[::7]], fontsize=8)
    ax_left.set_ylim(0, max(truth.max(), forecast.max()) * 1.30)
    ax_left.grid(axis="y", color=GRID, lw=0.8)
    ax_left.set_axisbelow(True)
    for side in ("top", "right"):
        ax_left.spines[side].set_visible(False)
    legend = ax_left.legend(frameon=False, fontsize=8.2, loc="upper left", handlelength=2.8, borderpad=0.1)
    for text in legend.get_texts():
        text.set_color(MUTED)

    positions = range(len(order))[::-1]
    ax_right.barh(
        list(positions), values, height=0.6,
        color=[ACCENT if m == SELECTED else BAR for m in order],
    )
    ax_right.set_yticks(list(positions))
    ax_right.set_yticklabels([LABEL.get(m, m) for m in order], fontsize=8.6)
    for text, model in zip(ax_right.get_yticklabels(), order):
        text.set_color(INK if model == SELECTED else MUTED)
        text.set_fontweight("bold" if model == SELECTED else "normal")
    ax_right.set_xlim(0, scale * 1.36)
    ax_right.xaxis.set_major_formatter(FuncFormatter(lambda v, _: f"${v / 1000:.0f}k"))
    ax_right.set_title("What each forecast cost to run", loc="left", fontsize=10, color=INK, pad=20)
    ax_right.text(0, 1.05, "INVENTORY COST, ONE POLICY", transform=ax_right.transAxes, fontsize=8, color=MUTED, va="bottom")
    ax_right.grid(axis="x", color=GRID, lw=0.8)
    ax_right.set_axisbelow(True)
    for side in ("top", "right", "left"):
        ax_right.spines[side].set_visible(False)
    ax_right.tick_params(axis="y", length=0)
    for y, value, model in zip(positions, values, order):
        ax_right.text(
            value + scale * 0.014, y, f"${value:,.0f}", va="center", fontsize=8.2,
            color=INK if model == SELECTED else MUTED,
        )
    ax_right.annotate(
        f"−${saved:,.0f}   (−{saved / cost[BASELINE] * 100:.1f}%)",
        xy=(values[0], list(positions)[0]), xytext=(values[0] + scale * 0.32, list(positions)[0]),
        va="center", fontsize=9.4, color=ACCENT, fontweight="bold",
        arrowprops=dict(arrowstyle="-", color=ACCENT, lw=0.9, shrinkA=3, shrinkB=3),
    )
    ax_right.text(scale * 0.014, list(positions)[0] - 1.05, NOTE, fontsize=7.8, color=MUTED, va="center")

    fig.savefig(OUT, dpi=180, bbox_inches="tight", pad_inches=0.14)
    print(f"wrote {OUT}  ({len(order)} models, saved ${saved:,.0f})")


if __name__ == "__main__":
    apply(plt.rcParams)
    main()
