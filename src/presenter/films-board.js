import { EXTRA_FILMS_CARD_COUNT, FILMS_CARD_COUNT_PER_STEP } from '../settings.js';
import { render, RenderPosition } from '../utils/render.js';
import FilmCardView from '../view/film-card.js';
import FilmDetailsView from '../view/film-details.js';
import FilmsListButtonView from '../view/films-list-button.js';
import FilmsListContainerView from '../view/films-list-container.js';
import FilmsListView from '../view/films-list.js';
import FilmsView from '../view/films.js';

export default class FilmsBoard {
  constructor(container) {
    this._container = container;

    this._filmsBoard = new FilmsView();
    this._allFilmsListComponent = new FilmsListView('All movies. Upcoming');
    this._topRatedListComponent = new FilmsListView('Top rated', true);
    this._mostCommentedListComponent = new FilmsListView('Most Commented', true);
    this._filmsListButtonComponent = new FilmsListButtonView();

    this._body = document.body;
  }

  init(films) {
    this._films = films.slice();
    this._renderFilmsBoard();
  }

  _renderFilmsBoard() {
    render(this._container, this._filmsBoard, RenderPosition.BEFOREEND);
    this._renderAll();
    this._renderTopRated();
    this._renderMostCommented();
  }

  _getFilmsLengthToRender(isExtra, films) {
    if (isExtra) {
      return EXTRA_FILMS_CARD_COUNT;
    }

    return Math.min(films.length, FILMS_CARD_COUNT_PER_STEP);
  }

  _renderFilms(filmListComponent, films, isExtra) {
    render(this._filmsBoard, filmListComponent, RenderPosition.BEFOREEND);

    const filmsListContainerComponent = new FilmsListContainerView();

    render(filmListComponent, filmsListContainerComponent, RenderPosition.BEFOREEND);

    films.slice(0, this._getFilmsLengthToRender(isExtra, films)).forEach((film) => {
      const filmCardComponent = new FilmCardView(film);
      filmCardComponent.setCardElementsClickHandler(this._openFilmDetails.bind(this, film));

      render(filmsListContainerComponent, filmCardComponent, RenderPosition.BEFOREEND);
    });
  }

  _renderAll() {
    this._renderFilms(this._allFilmsListComponent, this._films);
    render(this._allFilmsListComponent, this._filmsListButtonComponent, RenderPosition.BEFOREEND);
  }

  _renderTopRated() {
    this._renderFilms(this._topRatedListComponent, this._films, true);
  }

  _renderMostCommented() {
    this._renderFilms(this._mostCommentedListComponent, this._films, true);
  }

  _openFilmDetails(film) {
    this._body.classList.add('hide-overflow');

    const filmDetailsComponent = new FilmDetailsView(film);
    filmDetailsComponent.setCloseButtonClickHandler(this._closeFilmDetails.bind(this, filmDetailsComponent));

    render(this._body, filmDetailsComponent, RenderPosition.BEFOREEND);

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        document.removeEventListener('keydown', onEscKeyDown);
        this._closeFilmDetails(filmDetailsComponent);
      }
    };

    document.addEventListener('keydown', onEscKeyDown);
  }

  _closeFilmDetails(filmDetailsComponent) {
    this._body.classList.remove('hide-overflow');
    this._body.removeChild(filmDetailsComponent.getElement());
    filmDetailsComponent.removeElement();
  }
}
