export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this)
  }
  open() {
    this._popupSelector.classList.add('popup_is-opened');
    document.addEventListener('keydown', this._handleEscClose);
  };
  close() {
    this._popupSelector.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', this._handleEscClose);
  };
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  };
  setEventListeners(buttonCloseElement) {
    buttonCloseElement.addEventListener('click', () => {
      this.close();
    })
    this._popupSelector.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__exit')) {
        this.close();
      }
    });
  };

}
