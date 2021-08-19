import ChartComponent from "../components/StatisticChart";
import { filterData } from "../utils/filter";
import { render, RenderPosition, remove, replace } from "../utils/render.js";

class ChartPresenter {
  constructor(chartContainer, dataModel, filterModel, typeSelectModel) {
    this._isLoading = true;
    this._chart = null;
    this._dataModel = dataModel;
    this._filterModel = filterModel;
    this._typeSelectModel = typeSelectModel;
    this._chartContainer = chartContainer;

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._dataModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._label = this._typeSelectModel.getCurrentType();
    this._data = this._dataModel.getData();
    this._filter = this._filterModel.getFilter();

    this._initChart();
  }

  // destroy() {
  //   if (this._chartComponent) {
  //     remove(this._chartComponent);
  //   }
  // }

  _renderChart() {
    render(
      this._chartContainer,
      this._chartComponent,
      RenderPosition.BEFOREEND
    );
  }

  _initChart() {
    this._filteredData = this._filterData();
    this._prevChartComponent = this._chartComponent;

    this._chartComponent = new ChartComponent(this._filteredData, this._label);
    if (!this._prevChartComponent) {
      this._renderChart();
      return;
    }

    replace(this._chartComponent, this._prevChartComponent);

    remove(this._prevChartComponent);
  }

  _filterData() {
    return filterData(this._data, this._filter);
  }

  _handleModelEvent() {
    // this.destroy();
    this.init();
  }
}

export default ChartPresenter;
