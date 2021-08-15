import { createElement } from '../utils/render.js';

const createFilmsListButtonTemplate = () => (
  `<button class="films-list__show-more">Show more</button>
`);

export default class FilmsListButton {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsListButtonTemplate();
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
