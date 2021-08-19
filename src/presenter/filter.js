import { render, RenderPosition, remove, replace } from "../utils/render.js";
import { FilterType } from "../const";
import FilterComponent from "../components/Filter";

class FilterPresenter {
  constructor(filterContainer, filterModel, dataModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._dataModel = dataModel;

    this._handleFilterChange = this._handleFilterChange.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._dataModel.addObserver(this._handleModelEvent);
  }

  destroy() {
    if (this._filterComponent) {
      remove(this._filterComponent);
    }
  }

  init() {
    this._initFilter();
    this._renderFilter();
  }

  _initFilter() {
    this._filter = this._filterModel.getFilter();
    this.dates = this._dataModel.getDates();

    this._prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterComponent(
      {
        dateStart: this._filter[FilterType.DATE_START],
        dateEnd: this._filter[FilterType.DATE_END],
      },
      this.dates
    );
    this._filterComponent.setFilterChangeHandler(this._handleFilterChange);

    if (!this._prevFilterComponent) {
      this._renderFilter();
      return;
    }

    replace(this._filterComponent, this._prevFilterComponent);

    remove(this._prevFilterComponent);
  }

  _renderFilter() {
    render(
      this._filterContainer,
      this._filterComponent,
      RenderPosition.BEFOREEND
    );
  }

  _handleFilterChange(filter) {
    this._filterModel.setFilter(filter);
    this.init();
  }

  _handleModelEvent() {
    this._filterModel.resetFilter();
    this._initFilter();
  }
}

export default FilterPresenter;
