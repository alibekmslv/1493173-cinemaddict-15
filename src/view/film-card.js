import { FILM_CARD_DESCRIPTION_LIMIT } from '../settings.js';
import { cutString, getCommentsQuantity, getFilmDuration, getHumanizedDate, getMainGenre, isActive } from '../utils/movie.js';
import { createElement } from '../utils/render.js';


const createFilmCardTemplate = (film) => {
  const { id, comments } = film;
  const { title, alternativeTitle, totalRating, release, poster, description, genre, runtime } = film.filmInfo;
  const { watchlist, alreadyWatched, favorite } = film.userDetails;
  const activeClassName = 'film-card__controls-item--active';

  return `<article class="film-card" data-id="${id}">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${totalRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${getHumanizedDate(release.date, 'YYYY')}</span>
      <span class="film-card__duration">${getFilmDuration(runtime)}</span>
      <span class="film-card__genre">${getMainGenre(genre)}</span>
    </p>
    <img src="${poster}" alt="${alternativeTitle}" class="film-card__poster">
    <p class="film-card__description">${cutString(description, FILM_CARD_DESCRIPTION_LIMIT)}</p>
    <a class="film-card__comments">${getCommentsQuantity(comments)}</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${isActive(watchlist) ? activeClassName : ''}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${isActive(alreadyWatched) ? activeClassName : ''}" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite ${isActive(favorite) ? activeClassName : ''}" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class FilmCard {
  constructor(film) {
    this._element = null;
    this._film = film;
  }

  getFilm() {
    return this._film;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
      this._element.$component = this;
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
