import Abstract from "./Abstract";

class Main extends Abstract {
  getTemplate() {
    return `<div><div class="main__type"></div><div class="main__filter"></div><div class="main__chart"></div></div>`;
  }
}

export default Main;
