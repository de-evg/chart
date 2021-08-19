import Api from "./api/api";
import { BACKEND_URL } from "./const";
import DataModel from "./model/data";
import FilterModel from "./model/filter";
import TypeSelectModel from "./model/type-select";
import MainPresenter from "./presenter/main.js";

const api = new Api(BACKEND_URL);
const mainContainerElement = document.querySelector(".chart-container");

const typeSelectModel = new TypeSelectModel();
const dataModel = new DataModel();
const filterModel = new FilterModel();

const mainPresenter = new MainPresenter(
  mainContainerElement,
  typeSelectModel,
  filterModel,
  dataModel,
  api
);
mainPresenter.init();
