import LoadButtonView from "../components/LoadButton";
import TypeSelectView from "../components/TypeSelect";

import { render, RenderPosition, remove, replace } from "../utils/render.js";
import { ApiRoute } from "./../const";

class TypeSelectPresenter {
  constructor(typeSelectContainerElement, typeSelectModel, dataModel, api) {
    this._typeSelectContainerElement = typeSelectContainerElement;
    this._typeSelectModel = typeSelectModel;
    this._dataModel = dataModel;
    this._api = api;

    this._filterRegTemplate = RegExp("");
    this._filterType = "";

    this._handleTypeSelectChange = this._handleTypeSelectChange.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleLoadData = this._handleLoadData.bind(this);

    this._typeSelectModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentType = this._typeSelectModel.getCurrentType();
    this._types = this._typeSelectModel.getTypes();

    this._typeSelectComponent = new TypeSelectView(
      this._currentType,
      this._types,
      this._filterRegTemplate,
      this._filterType
    );

    this._loadButtonComponent = new LoadButtonView();

    this._typeSelectComponent.setSelectChangeHandler(
      this._handleTypeSelectChange
    );
    this._typeSelectComponent.setFilterChangeListener(
      this._handleFilterTypeChange
    );

    this._loadButtonComponent.setBtnClickHandler(this._handleLoadData);

    this._renderTypeSelect();
    this._renderLoadButton();
  }

  destroy() {
    remove(this._typeSelectComponent);
    remove(this._loadButtonComponent);
  }

  _initTypeSelect() {
    this._currentType = this._typeSelectModel.getCurrentType();
    this._prevTypeSelectComponent = this._typeSelectComponent;

    this._typeSelectComponent = new TypeSelectView(
      this._currentType,
      this._typeSelectModel.getTypes(),
      this._filterRegTemplate,
      this._filterType
    );
    this._typeSelectComponent.setSelectChangeHandler(
      this._handleTypeSelectChange
    );
    this._typeSelectComponent.setFilterChangeListener(
      this._handleFilterTypeChange
    );

    if (!this._prevTypeSelectComponent) {
      this._renderTypeSelect();
      return;
    }

    replace(this._typeSelectComponent, this._prevTypeSelectComponent);

    remove(this._prevTypeSelectComponent);
  }

  _initLoadButton() {
    this._prevLoadButtonComponent = this._loadButtonComponent;

    this._loadButtonComponent = new LoadButtonView(this._dataModel, this._api);
    this._loadButtonComponent.setBtnClickHandler(this._handleLoadData);

    if (!this._prevLoadButtonComponent) {
      this._renderLoadButton();
      return;
    }

    replace(this._loadButtonComponent, this._prevLoadButtonComponent);

    remove(this._prevLoadButtonComponent);
  }

  _renderTypeSelect() {
    render(
      this._typeSelectContainerElement,
      this._typeSelectComponent,
      RenderPosition.BEFOREEND
    );
  }

  _renderLoadButton() {
    render(
      this._typeSelectContainerElement,
      this._loadButtonComponent,
      RenderPosition.BEFOREEND
    );
  }

  _handleFilterTypeChange(filter) {
    this._filterType = filter;
    this._filterRegTemplate = RegExp(filter.toLowerCase());
    this._initTypeSelect();
  }

  _handleTypeSelectChange(currentName) {
    this._typeSelectModel.setCurrentType(currentName);
  }

  async _handleLoadData(setIsLoadData) {
    const type = this._typeSelectModel.getCurrentType();
    const data = await this._api.getData(`${ApiRoute.GET_DATA}?name=${type}`);
    const isData = Object.keys(data).length;
    if (isData) {
      this._dataModel.setData(data);
      setIsLoadData(false);
      // this._filterData();
      // const { dates } = this._dataFiltered;
      // this._setDataFilter({
      //   ...this._filter,
      //   [FilterType.NAME]: this._currentValueName,
      //   [FilterType.DATE_START]: dates[0],
      //   [FilterType.DATE_END]: dates[dates.length - 1],
      // });
    }
  }

  _handleModelEvent() {
    this._initTypeSelect();
    this._initLoadButton();
  }
}

export default TypeSelectPresenter;
