export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector;
    this._isFromStart
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems(items) {
    items.reverse().forEach(item => {
      this._renderer(item);
    });
  }

  renderNewCard(item) {
    this._renderer(item);
    this._isFromStart = true
  }
}
