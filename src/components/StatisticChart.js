import Chart from "chart.js/auto";
import Smart from "./Smart";

const BAR_HEIGHT = 50;

const ChartPalette = {
  NAVY_BLUE: "#05445E",
  BLUE_GROTTO: "#189AB4",
  BLUE_GREEN: "#75E6DA",
  BABY_BLUE: "#D4F1F4",
};

class StatisticChart extends Smart {
  constructor(data, label) {
    super();
    this._data = data;
    this._datasetLabel = label;
    this._labels = this._data.dates;
    this._values = this._data.values;
    this._statisticCtx = this.getElement().querySelector(`.statistic__chart`);
    this._statisticCtx.height = BAR_HEIGHT;
    this._createChart();
  }

  getTemplate() {
    return `<div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="400" height="400"></canvas>
        </div>`;
  }

  _createChart() {
    this._myChart = new Chart(this._statisticCtx, {
      type: `line`,
      data: {
        labels: this._labels,
        datasets: [
          {
            label: this._datasetLabel,
            data: this._values,
            backgroundColor: ChartPalette.BLUE_GROTTO,
            hoverBackgroundColor: ChartPalette.NAVY_BLUE,
            borderColor: ChartPalette.BLUE_GREEN,
          },
        ],
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 20,
            },

            anchor: `start`,
            align: `start`,
            offset: 40,
          },
        },

        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
      },
    });
  }
}

export default StatisticChart;
