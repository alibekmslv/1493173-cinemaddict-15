import { createElement } from '../utils/render.js';

const createFooterStatisticsTextTemplate = (movies) => (`
  <p>${movies.length} movies inside</p>
`);

export default class FooterStatisticsText {
  constructor(movies) {
    this._element = null;
    this._movies = movies;
  }

  getTemplate() {
    return createFooterStatisticsTextTemplate(this._movies);
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
