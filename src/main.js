import ProfileView from './view/profile.js';
import MainNavigationView from './view/main-navigation.js';
import SortView from './view/sort.js';
import StatisticsView from './view/statisctics.js';
import FilmsView from './view/films.js';
import FilmsListView from './view/films-list.js';
import FilmsListEmptyView from './view/films-list-empty.js';
import FilmsListContainerView from './view/films-list-container.js';
import FilmsListButtonView from './view/films-list-button.js';
import FilmCardView from './view/film-card.js';
import FooterStatisticsTextView from './view/footer-statistics-text.js';
import FilmDetailsView from './view/film-details.js';
import { FILMS_CARD_COUNT, EXTRA_FILMS_CARD_COUNT, FILMS_CARD_COUNT_PER_STEP } from './settings.js';
import { remove, render, RenderPosition } from './utils/render.js';
import { generateMovie } from './mock/movie.js';
import { generateFilter } from './mock/filter.js';

const films = new Array(FILMS_CARD_COUNT).fill().map(generateMovie);
const filters = generateFilter(films);

const body = document.body;
const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');
const footerStatistics = footerElement.querySelector('.footer__statistics');

render(headerElement, new ProfileView(filters), RenderPosition.BEFOREEND);

const mainNavigationComponent = new MainNavigationView(filters);
render(mainElement, mainNavigationComponent, RenderPosition.AFTERBEGIN);

render(footerStatistics, new FooterStatisticsTextView(films), RenderPosition.BEFOREEND);

render(mainNavigationComponent, new SortView(), RenderPosition.AFTEREND);

render(mainElement, new StatisticsView(filters), RenderPosition.BEFOREEND);

const filmsComponent = new FilmsView();
render(mainElement, filmsComponent, RenderPosition.BEFOREEND);

const allFilmsListComponent = new FilmsListView('All movies. Upcoming');
render(filmsComponent, allFilmsListComponent, RenderPosition.AFTERBEGIN);

const allFilmsListContainerComponent = new FilmsListContainerView();
render(allFilmsListComponent, allFilmsListContainerComponent, RenderPosition.BEFOREEND);

const closeFilmDetails = (filmDetailsComponent) => {
  body.classList.remove('hide-overflow');
  body.removeChild(filmDetailsComponent.getElement());
  filmDetailsComponent.removeElement();
};

const openFilmDetails = (film) => {
  body.classList.add('hide-overflow');

  const filmDetailsComponent = new FilmDetailsView(film);
  filmDetailsComponent.setCloseButtonClickHandler(closeFilmDetails.bind(null, filmDetailsComponent));

  render(footerElement, filmDetailsComponent, RenderPosition.AFTEREND);

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      document.removeEventListener('keydown', onEscKeyDown);
      closeFilmDetails(filmDetailsComponent);
    }
  };

  document.addEventListener('keydown', onEscKeyDown);
};

films.slice(0, Math.min(films.length, FILMS_CARD_COUNT_PER_STEP)).forEach((film) => {
  const filmCardComponent = new FilmCardView(film);
  filmCardComponent.setCardElementsClickHandler(openFilmDetails.bind(null, film));

  render(allFilmsListContainerComponent, filmCardComponent.getElement(), RenderPosition.BEFOREEND);
});

if (films.length > FILMS_CARD_COUNT_PER_STEP) {
  let renderedFilmsCount = FILMS_CARD_COUNT_PER_STEP;

  const showMoreFilms = (buttonComponent) => {
    films
      .slice(renderedFilmsCount, renderedFilmsCount + FILMS_CARD_COUNT_PER_STEP)
      .forEach((film) => {
        const filmCardComponent = new FilmCardView(film);
        filmCardComponent.setCardElementsClickHandler(openFilmDetails.bind(null, film));

        render(allFilmsListContainerComponent, filmCardComponent, RenderPosition.BEFOREEND);
      });

    renderedFilmsCount += FILMS_CARD_COUNT_PER_STEP;

    if (renderedFilmsCount >= films.length) {
      remove(buttonComponent);
    }
  };

  const filmsListButtonComponent = new FilmsListButtonView();
  filmsListButtonComponent.setButtonClickHandler(showMoreFilms.bind(null, filmsListButtonComponent));

  render(allFilmsListComponent, filmsListButtonComponent, RenderPosition.BEFOREEND);
}

const topRatedFilmsListComponent = new FilmsListView('Top rated', true);
render(filmsComponent, topRatedFilmsListComponent, RenderPosition.BEFOREEND);

const topRatedFilmsListContainerComponent = new FilmsListContainerView();
render(topRatedFilmsListComponent, topRatedFilmsListContainerComponent, RenderPosition.BEFOREEND);

films.slice(0, EXTRA_FILMS_CARD_COUNT).forEach((film) => {
  const filmCardComponent = new FilmCardView(film);
  filmCardComponent.setCardElementsClickHandler(openFilmDetails.bind(null, film));

  render(topRatedFilmsListContainerComponent, filmCardComponent, RenderPosition.BEFOREEND);
});

const mostCommentedFilmsListComponent = new FilmsListView('Most commented', true);
render(filmsComponent, mostCommentedFilmsListComponent, RenderPosition.BEFOREEND);

const mostCommentedFilmsListContainerComponent = new FilmsListContainerView();
render(mostCommentedFilmsListComponent, mostCommentedFilmsListContainerComponent, RenderPosition.BEFOREEND);

films.slice(0, EXTRA_FILMS_CARD_COUNT).forEach((film) => {
  const filmCardComponent = new FilmCardView(film);
  filmCardComponent.setCardElementsClickHandler(openFilmDetails.bind(null, film));

  render(mostCommentedFilmsListContainerComponent, filmCardComponent, RenderPosition.BEFOREEND);
});

if (films.length === 0) {
  allFilmsListComponent.getElement().innerHTML = '';
  render(allFilmsListComponent, new FilmsListEmptyView(), RenderPosition.BEFOREEND);
  remove(topRatedFilmsListComponent);
  remove(mostCommentedFilmsListComponent);
}
