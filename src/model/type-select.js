import Observer from "../utils/observer.js";

const DEFAULT_VALUE = "Выберите тип";
const DEFAULT_TYPES = [];

class TypeSelectModel extends Observer {
  constructor() {
    super();
    this._currentType = DEFAULT_VALUE;
    this._types = DEFAULT_TYPES;
  }

  getTypes() {
    return this._types;
  }

  getCurrentType() {
    return this._currentType;
  }

  setCurrentType(currentType, actionType) {
    this._currentType = currentType;

    this._notify(actionType, this._currentType);
  }

  setTypes(types, actionType) {
    this._types = types;

    this._notify(actionType, this._types);
  }
}

export default TypeSelectModel;
