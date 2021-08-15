import { getProfileRating } from '../utils/filter.js';
import { createElement } from '../utils/render.js';

const createProfileTemplate = (filters) => (
  `<section class="header__profile profile">
    <p class="profile__rating">${getProfileRating(filters)}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
);

export default class Profile {
  constructor(filters) {
    this._elment = null;
    this._filters = filters;
  }

  getTemplate() {
    return createProfileTemplate(this._filters);
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
