import { FilterType } from "../const.js";
import Observer from "../utils/observer.js";

const DefaultFilter = {
  [FilterType.DATE_START]: null,
  [FilterType.DATE_END]: null,
};

class FilterModel extends Observer {
  constructor() {
    super();
    this._filter = DefaultFilter;
  }

  getFilter() {
    return this._filter;
  }

  setFilter(filter, actionType) {
    this._filter = { ...this._filter, ...filter };

    this._notify(actionType, filter);
  }

  resetFilter() {
    this._filter = DefaultFilter;
  }
}

export default FilterModel;
