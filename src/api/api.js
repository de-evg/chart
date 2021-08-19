import DataModel from "../model/data.js";

const Method = {
  GET: `GET`,
  PUT: `PUT`,
  POST: `POST`,
  DELETE: `DELETE`,
  OPTIONS: `OPTIONS`,
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299,
};

class Api {
  constructor(endPoint) {
    this._endPoint = endPoint;
    this._isLoading = false;
  }

  getData(url) {
    return this._load({ url })
      .then((response) => Api.toJSON(response))
      .catch((err) => {
        throw new Error(err);
      });
  }

  getLoadingStatus() {
    return this._isLoading;
  }

  _setIsLoadingStatus(status) {
    this._isLoading = status;
  }

  async _load({
    url,
    method = Method.GET,
    body = null,
    headers = {
      "Content-Type": "application/json",
    },
  }) {
    this._setIsLoadingStatus(true);

    return await fetch(`${this._endPoint}${url}`, {
      method,
      body,
      headers,
    })
      .then(Api.checkStatus)
      .catch((error) => {
        console.log(error);
      })
      .finally(() => this._setIsLoadingStatus(false));
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN &&
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}

export default Api;
