import { FilterType } from "../const";
import Abstract from "./Abstract";

const style = {
  flexColumn: "display:flex;flex-direction:column;",
  selectInput: "width:150px;padding:5px 10px;",
  selectLabel: "padding-left:10px",
  form: "margin-left:30px;width:500px;display:flex;justify-content:space-between;align-items:center;margin-bottom:10px",
};

class Filter extends Abstract {
  constructor(currentValue, dates) {
    super();
    this._dates = dates;
    this._currentDateStart = currentValue.dateStart;
    this._currentDateEnd = currentValue.dateEnd;

    this._filterChangeHandler = this._filterChangeHandler.bind(this);
  }

  getTemplate() {
    return `<form style=${style.form}>
    <div style=${style.flexColumn}>
    <label style=${style.selectLabel} for="dateStart">Начальная дата</label>
    <select style=${style.selectInput} id="dateStart" name=${
      FilterType.DATE_START
    }>
      ${this._getDateOptionsTemplate(
        this._currentDateStart,
        FilterType.DATE_START
      )}
    </select>
    </div>
    <div style=${style.flexColumn}>
    <label style=${style.selectLabel} for="dateEnd">Конечная дата</label>
    <select style=${style.selectInput} id="dateEnd" name=${FilterType.DATE_END}>
      ${this._getDateOptionsTemplate(this._currentDateEnd, FilterType.DATE_END)}
    </select>
    </div>
    </form>`;
  }

  _getDateOptionsTemplate(currentDate, dateType) {
    const defaultValue =
      !currentDate && dateType === FilterType.DATE_START
        ? this._dates[0]
        : this._dates[this._dates.length - 1];

    return `${
      !currentDate
        ? `<option selected="true" value="">${defaultValue}</option>`
        : ""
    }
    ${this._dates
      .map(
        (date) =>
          `<option ${
            currentDate === date ? "selected" : ""
          } value="${date}">${date}</option>`
      )
      .join("")}`;
  }

  setFilterChangeHandler(callback) {
    this._callback.filterChange = callback;
    this.getElement().addEventListener(`change`, this._filterChangeHandler);
  }

  _filterChangeHandler(evt) {
    const name = evt.target.name;
    const value = evt.target.value;

    this._callback.filterChange({ [name]: value });
  }
}

export default Filter;
