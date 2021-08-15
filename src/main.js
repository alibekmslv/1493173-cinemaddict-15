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
import { renderElement, RenderPosition } from './utils/render.js';
import { generateMovie } from './mock/movie.js';
import { generateFilter } from './mock/filter.js';

const films = new Array(FILMS_CARD_COUNT).fill().map(generateMovie);
const filters = generateFilter(films);

const body = document.body;
const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');
const footerStatistics = footerElement.querySelector('.footer__statistics');

renderElement(headerElement, new ProfileView(filters).getElement(), RenderPosition.BEFOREEND);

const mainNavigationComponent = new MainNavigationView(filters);
const mainNavigationElement = mainNavigationComponent.getElement();
renderElement(mainElement, mainNavigationElement, RenderPosition.AFTERBEGIN);

renderElement(footerStatistics, new FooterStatisticsTextView(films).getElement(), RenderPosition.BEFOREEND);

renderElement(mainNavigationElement, new SortView().getElement(), RenderPosition.AFTEREND);

renderElement(mainElement, new StatisticsView(filters).getElement(), RenderPosition.BEFOREEND);

const filmsComponent = new FilmsView();
const filmsElement = filmsComponent.getElement();
renderElement(mainElement, filmsElement, RenderPosition.BEFOREEND);

const allFilmsListComponent = new FilmsListView('All movies. Upcoming');
const allFilmsListElement = allFilmsListComponent.getElement();
renderElement(filmsElement, allFilmsListElement, RenderPosition.AFTERBEGIN);

const allFilmsListContainerComponent = new FilmsListContainerView();
const allFilmsListContainerElement = allFilmsListContainerComponent.getElement();
renderElement(allFilmsListElement, allFilmsListContainerElement, RenderPosition.BEFOREEND);

films.slice(0, Math.min(films.length, FILMS_CARD_COUNT_PER_STEP)).forEach((film) => {
  renderElement(allFilmsListContainerElement, new FilmCardView(film).getElement(), RenderPosition.BEFOREEND);
});

if (films.length > FILMS_CARD_COUNT_PER_STEP) {
  let renderedFilmsCount = FILMS_CARD_COUNT_PER_STEP;

  const filmsListButtonComponent = new FilmsListButtonView();
  const filmsListButtonElement = filmsListButtonComponent.getElement();
  renderElement(allFilmsListElement, filmsListButtonElement, RenderPosition.BEFOREEND);

  filmsListButtonElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmsCount, renderedFilmsCount + FILMS_CARD_COUNT_PER_STEP)
      .forEach((movie) => renderElement(allFilmsListContainerElement, new FilmCardView(movie).getElement(), RenderPosition.BEFOREEND));

    renderedFilmsCount += FILMS_CARD_COUNT_PER_STEP;

    if (renderedFilmsCount >= films.length) {
      filmsListButtonElement.remove();
    }
  });
}

const topRatedFilmsListComponent = new FilmsListView('Top rated', true);
const topRatedFilmsListElement = topRatedFilmsListComponent.getElement();
renderElement(filmsElement, topRatedFilmsListElement, RenderPosition.BEFOREEND);

const topRatedFilmsListContainerComponent = new FilmsListContainerView();
const topRatedFilmsListContainerElement = topRatedFilmsListContainerComponent.getElement();
renderElement(topRatedFilmsListElement, topRatedFilmsListContainerElement, RenderPosition.BEFOREEND);

films.slice(0, EXTRA_FILMS_CARD_COUNT).forEach((film) => renderElement(topRatedFilmsListContainerElement, new FilmCardView(film).getElement(), RenderPosition.BEFOREEND));

const mostCommentedFilmsListComponent = new FilmsListView('Most commented', true);
const mostCommentedFilmsListElement = mostCommentedFilmsListComponent.getElement();
renderElement(filmsElement, mostCommentedFilmsListElement, RenderPosition.BEFOREEND);

const mostCommentedFilmsListContainerComponent = new FilmsListContainerView();
const mostCommentedFilmsListContainerElement = mostCommentedFilmsListContainerComponent.getElement();
renderElement(mostCommentedFilmsListElement, mostCommentedFilmsListContainerElement, RenderPosition.BEFOREEND);

films.slice(0, EXTRA_FILMS_CARD_COUNT).forEach((film) => renderElement(mostCommentedFilmsListContainerElement, new FilmCardView(film).getElement(), RenderPosition.BEFOREEND));

filmsElement.addEventListener('click', (e) => {
  const contains = (className) => e.target.classList.contains(className);

  if (contains('film-card__title') || contains('film-card__poster') || contains('film-card__comments')) {
    const film = e.target.parentElement.$component.getFilm();

    body.classList.add('hide-overflow');

    const filmDetailsComponent = new FilmDetailsView(film);
    const filmDetailsElement = filmDetailsComponent.getElement();
    renderElement(footerElement, filmDetailsElement, RenderPosition.AFTEREND);

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();

        body.classList.remove('hide-overflow');
        body.removeChild(filmDetailsElement);
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    document.addEventListener('keydown', onEscKeyDown);
  }
});

if (films.length === 0) {
  allFilmsListElement.innerHTML = '';
  renderElement(allFilmsListElement, new FilmsListEmptyView().getElement(), RenderPosition.BEFOREEND);
  filmsElement.removeChild(topRatedFilmsListElement);
  filmsElement.removeChild(mostCommentedFilmsListElement);
}
