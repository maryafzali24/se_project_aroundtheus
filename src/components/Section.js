export default class Section {
  constructor({ renderer }, containerSelector) {
    // this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // renderItems(items) {
  //   console.log("================================");
  //   console.log(items.json());
  //   items.forEach((item) => {
  //     this._renderer(item);
  //   });
  // }

  renderItems(items) {
    console.log("oooooooooooooo");
    console.log(items);
    items.forEach((item) => this._renderer(item));
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
