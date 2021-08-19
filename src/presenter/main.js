import TypeSelectPresenter from "./type-select";
import FilterPresenter from "./filter";
import ChartPresenter from "./chart";

import MainView from "./../components/Main";

import { render, RenderPosition, remove, replace } from "../utils/render.js";
import { ApiRoute } from "./../const";

class MainPresenter {
  constructor(
    mainContainerElement,
    typeSelectModel,
    filterModel,
    dataModel,
    api
  ) {
    this._mainContainerElement = mainContainerElement;

    this._typeSelectModel = typeSelectModel;
    this._filterModel = filterModel;
    this._dataModel = dataModel;

    this._api = api;

    this._isLoading = true;

    this._onPageLoad = this._onPageLoad.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleDataModelEvent = this._handleDataModelEvent.bind(this);

    this._mainComponent = new MainView();

    this._typeSelectContainerElement = this._mainComponent
      .getElement()
      .querySelector(".main__type");

    this._filterContainerElement = this._mainComponent
      .getElement()
      .querySelector(".main__filter");

    this._chartContainerElement = this._mainComponent
      .getElement()
      .querySelector(".main__chart");

    this._typeSelectPresenter = new TypeSelectPresenter(
      this._typeSelectContainerElement,
      this._typeSelectModel,
      this._dataModel,
      this._api
    );
    this._filterPresenter = new FilterPresenter(
      this._filterContainerElement,
      this._filterModel,
      this._dataModel
    );
    this._chartPresenter = new ChartPresenter(
      this._chartContainerElement,
      this._dataModel,
      this._filterModel,
      this._typeSelectModel
    );

    this._typeSelectModel.addObserver(this._handleModelEvent);
    this._dataModel.addObserver(this._handleDataModelEvent);
    this._setPageLoadListener();
  }

  init() {
    const { dateStart, dateEnd } = this._filterModel.getFilter();

    this._initTypeSelectPresenter();
    if (dateStart && dateEnd) {
      this._filterPresenter.init();
    }

    this._renderMain();
  }

  _initTypeSelectPresenter() {
    this._typeSelectPresenter.init(
      this._typeSelectContainerElement,
      this._typeSelectModel
    );
  }

  removeListener() {
    document.removeEventListener("load", this._onPageLoad);
  }

  async _onPageLoad() {
    if (this._isLoading) {
      const types = await this._api.getData(ApiRoute.GET_VALUE_NAMES);
      this._isLoading = false;
      this._typeSelectModel.setTypes(types);
    }
  }

  _renderMain() {
    render(
      this._mainContainerElement,
      this._mainComponent,
      RenderPosition.BEFOREEND
    );
  }

  _setPageLoadListener() {
    window.addEventListener("load", this._onPageLoad);
  }

  _handleModelEvent() {
    this.removeListener();
  }

  _handleDataModelEvent() {
    this._chartPresenter.init();
  }
}

export default MainPresenter;
