import { getProfileRating } from '../utils/filter.js';
import AbstractView from './abstract.js';

const createProfileTemplate = (filters) => (
  `<section class="header__profile profile">
    <p class="profile__rating">${getProfileRating(filters)}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
);

export default class Profile extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createProfileTemplate(this._filters);
  }
}
