import AbstractView from './abstract.js';

const createFilmsListButtonTemplate = () => (
  `<button class="films-list__show-more">Show more</button>
`);

export default class FilmsListButton extends AbstractView {
  constructor() {
    super();
    this._buttonClickHandler = this._buttonClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmsListButtonTemplate();
  }

  _buttonClickHandler() {
    this._callback.buttonClick();
  }

  setButtonClickHandler(callback) {
    this._callback.buttonClick = callback;
    this.getElement().addEventListener('click', this._buttonClickHandler);
  }
}
