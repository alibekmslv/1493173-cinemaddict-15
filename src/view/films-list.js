import AbstractView from './abstract.js';

const createFilmsListTemplate = (listTitle, isExtra) => (
  `<section class="films-list ${isExtra ? 'films-list--extra' : ''}">
    <h2 class="films-list__title ${!isExtra ? 'visually-hidden' : ''}">${listTitle}</h2>
  </section>`
);

export default class FilmsList extends AbstractView {
  constructor(listTitle, isExtra) {
    super();
    this._listTitle = listTitle;
    this._isExtra = isExtra;
  }

  getTemplate() {
    return createFilmsListTemplate(this._listTitle, this._isExtra);
  }
}
