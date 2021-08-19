import Abstract from "./Abstract";

const style = {
  button: "margin-left:30px;width:150px;padding:5px 10px;",
};

class LoadButton extends Abstract {
  constructor(dataModel) {
    super();
    this._dataModel = dataModel;
    this._isLoading = false;

    this._btnClickHandler = this._btnClickHandler.bind(this);
    this._setIsLoadingButton = this._setIsLoadingButton.bind(this);
  }

  getTemplate() {
    return `<button style=${style.button} disable="${this._isLoading}">Загрузить данные</button>`;
  }

  setBtnClickHandler(callback) {
    this._callback.loadData = callback;
    this.getElement().addEventListener(`click`, this._btnClickHandler);
  }

  _setIsLoadingButton() {
    this._isLoading = false;
  }

  _btnClickHandler() {
    this._isLoading = true;
    this._callback.loadData(this._setIsLoadingButton);
  }
}

export default LoadButton;
