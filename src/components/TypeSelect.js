import Abstract from "./Abstract";

const VALUE_NAME = "VALUE_NAME";

const style = {
  flexColumn: "display:flex;flex-direction:column;",
  selectInput: "width:150px;padding:5px 10px;",
  selectLabel: "padding-left:10px",
  form: "margin-left:30px;width:320px;display:flex;justify-content:space-between;align-items:center;margin-bottom:10px",
};

class TypeSelect extends Abstract {
  constructor(currentType, types, filterRegTemplate, filterType) {
    super();
    this._currentType = currentType;
    this._types = types;
    this._filterRegTemplate = filterRegTemplate;
    this._filterValue = filterType;

    this._selectChangeHandler = this._selectChangeHandler.bind(this);
    this._filterChangeHandler = this._filterChangeHandler.bind(this);
  }

  getTemplate() {
    return `<form style=${style.form}>
    <div style=${style.flexColumn}>
    ${this._getOptionsFilterTemplate()}
    <label style=${style.selectLabel} for="dateName">Тип данных</label>
    <select style=${style.selectInput} id="dataName" name=${VALUE_NAME}>
      ${this._getNameOptionsTemplate()}
    </select>
    </div>
    </form>`;
  }

  _getNameOptionsTemplate() {
    const filteredNames = this._types.filter((name) => {
      const lowerName = name.toLowerCase();

      return lowerName.match(this._filterRegTemplate);
    });

    return `${
      this._currentType === "Выберите тип"
        ? `<option selected="true" value="">
          ${this._currentType}
        </option>`
        : ""
    }
        ${filteredNames
          .map(
            (name) =>
              `<option ${
                this._currentType === name ? "selected" : ""
              } value="${name}">${name}</option>`
          )
          .join("")}`;
  }

  _getOptionsFilterTemplate() {
    return `
    <label for="typeFilter">Фильтр типа данных</label>
    <input id="typeFilter" value="${this._filterValue}" placeholder="Введите тип данных" style=${style.selectInput}  />`;
  }

  setFilterChangeListener(callback) {
    this._callback.inputFilterChange = callback;
    this.getElement()
      .querySelector("#typeFilter")
      .addEventListener(`change`, this._filterChangeHandler);
  }

  setSelectChangeHandler(callback) {
    this._callback.selectChange = callback;
    this.getElement()
      .querySelector("#dataName")
      .addEventListener(`change`, this._selectChangeHandler);
  }

  _selectChangeHandler(evt) {
    const value = evt.target.value;

    this._callback.selectChange(value);
  }

  _filterChangeHandler(evt) {
    const value = evt.target.value;
    this._callback.inputFilterChange(value);
  }
}

export default TypeSelect;
