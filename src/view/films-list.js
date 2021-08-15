import { createElement } from '../utils/render.js';

const createFilmsListTemplate = (listTitle, isExtra) => (
  `<section class="films-list ${isExtra ? 'films-list--extra' : ''}">
    <h2 class="films-list__title ${!isExtra ? 'visually-hidden' : ''}">${listTitle}</h2>
  </section>`
);

export default class FilmsList {
  constructor(listTitle, isExtra) {
    this._element = null;
    this._listTitle = listTitle;
    this._isExtra = isExtra;
  }

  getTemplate() {
    return createFilmsListTemplate(this._listTitle, this._isExtra);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
