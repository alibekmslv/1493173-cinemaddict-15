import { allComments } from '../mock/movie.js';
import { getFilmDuration, getHumanizedDate, isActive, isComments } from '../utils/movie.js';
import AbstractView from './abstract.js';

const createFilmDetailsCommentsList = (comments) => (`
<ul class="film-details__comments-list">
${comments.map((comment) => (`
  <li class="film-details__comment" data-id="${comment.id}">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${comment.comment}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${comment.author}</span>
        <span class="film-details__comment-day">${getHumanizedDate(comment.date, 'YYYY/MM/DD HH:mm')}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>
`)).join('')}
</ul>
`);

const createFilmDetailsTemplate = (movie) => {
  const { id, comments } = movie;
  const { title, alternativeTitle, totalRating, ageRating, release, poster, director, writers, actors, description, genre, runtime } = movie.filmInfo;
  const { watchlist, alreadyWatched, favorite } = movie.userDetails;
  const activeClassName = 'film-details__control-button--active';

  let filmDetailsCommentsList;

  if (isComments(comments)) {
    const foundComments = allComments.filter((comment) => comments.includes(comment.id));
    filmDetailsCommentsList = createFilmDetailsCommentsList(foundComments);
  } else {
    filmDetailsCommentsList = '';
  }

  return `<section class="film-details" data-id=${id}>
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${poster}" alt="${alternativeTitle}">

            <p class="film-details__age">${ageRating}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">Original: ${title}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${totalRating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writers.join(', ')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors.join(', ')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${getHumanizedDate(release.date, 'D MMMM YYYY')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${getFilmDuration(runtime)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${release.releaseCountry}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  ${genre.map((name) => `
                    <span class="film-details__genre">${name}</span>
                  `).join('')}
              </tr>
            </table>

            <p class="film-details__film-description">
              ${description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <button type="button" class="film-details__control-button film-details__control-button--watchlist ${isActive(watchlist) ? activeClassName : ''}" id="watchlist" name="watchlist">${isActive(watchlist) ? 'In watchlist' : 'Add to watchlist'}</button>
          <button type="button" class="film-details__control-button film-details__control-button--watched ${isActive(alreadyWatched) ? activeClassName : ''}" id="watched" name="watched">${isActive(alreadyWatched) ? 'Already watched' : 'Mark as watched'}</button>
          <button type="button" class="film-details__control-button film-details__control-button--favorite ${isActive(favorite) ? activeClassName : ''}" id="favorite" name="favorite">${isActive(favorite) ? 'In favorites' : 'Add to favorites'}</button>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${isComments(comments) ? comments.length : 0}</span></h3>
          ${filmDetailsCommentsList}
          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label"></div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
};

export default class FilmDetails extends AbstractView {
  constructor(movie) {
    super();
    this._movie = movie;
    this._closeButtonClickHandler = this._closeButtonClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._movie);
  }

  _closeButtonClickHandler() {
    this._callback.closeButtonClick();
  }

  setCloseButtonClickHandler(callback) {
    this._callback.closeButtonClick = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._closeButtonClickHandler);
  }
}
