import moment from "moment";
import Observer from "../utils/observer.js";

class DataModel extends Observer {
  constructor() {
    super();
    this._data = [];
    this._types = [];
    this._currentValueName = "";
  }

  getData() {
    return this._data;
  }

  getDates() {
    if (!this._data.length) {
      return [];
    }
    return this._data.reduce((dates, currentItem) => {
      const date = moment(currentItem.date).format("YYYY");
      dates.push(date);

      return dates;
    }, []);
  }

  setData(data) {
    this._data = [...data];

    this._notify();
  }
}

export default DataModel;
