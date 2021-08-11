import { createProfileTemplate } from './view/profile.js';
import { createMainNavigationTemplate } from './view/main-navigation.js';
import { createSortTemplate } from './view/sort.js';
import { createStatisticsTemplate } from './view/statisctics.js';
import { createFilmsTemplate } from './view/films.js';
import { createFilmsListTemplate } from './view/films-list.js';
import { createFilmsListButtonTemplate } from './view/films-list-button.js';
import { createFilmCardTemplate } from './view/film-card.js';
import { createFooterStatisticsTextTemplate } from './view/footer-statistics-text.js';
import { createFilmDetailsTemplate } from './view/film-details.js';
import { FILMS_CARD_COUNT, EXTRA_FILMS_CARD_COUNT, FILMS_CARD_COUNT_PER_STEP } from './settings.js';
import { render } from './utils/render.js';
import { generateMovie } from './mock/movie.js';
import { generateFilter } from './mock/filter.js';

const movies = new Array(FILMS_CARD_COUNT).fill().map(generateMovie);
const filters = generateFilter(movies);

const headerElement = document.querySelector('.header');
render(headerElement, createProfileTemplate(filters), 'beforeend');

const mainElement = document.querySelector('.main');
render(mainElement, createMainNavigationTemplate(filters), 'afterbegin');

const footerElement = document.querySelector('.footer');
const footerStatistics = footerElement.querySelector('.footer__statistics');
render(footerStatistics, createFooterStatisticsTextTemplate(movies), 'beforeend');

const mainNavigationElement = mainElement.querySelector('.main-navigation');
render(mainNavigationElement, createSortTemplate(), 'afterend');

render(mainElement, createStatisticsTemplate(filters), 'beforeend');
render(mainElement, createFilmsTemplate(), 'beforeend');

const filmsElement = mainElement.querySelector('.films');
render(filmsElement, createFilmsListTemplate('All movies. Upcoming'), 'afterbegin');

const allFilmsListElement = filmsElement.querySelector('.films-list');
const allFilmsListContainerElement = allFilmsListElement.querySelector('.films-list__container');

for (let i = 0; i < Math.min(movies.length, FILMS_CARD_COUNT_PER_STEP); i++) {
  render(allFilmsListContainerElement, createFilmCardTemplate(movies[i]), 'beforeend');
}

if (movies.length > FILMS_CARD_COUNT_PER_STEP) {
  let renderedFilmsCount = FILMS_CARD_COUNT_PER_STEP;

  render(allFilmsListElement, createFilmsListButtonTemplate(), 'beforeend');

  const showMoreButton = allFilmsListElement.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    movies
      .slice(renderedFilmsCount, renderedFilmsCount + FILMS_CARD_COUNT_PER_STEP)
      .forEach((movie) => render(allFilmsListContainerElement, createFilmCardTemplate(movie), 'beforeend'));

    renderedFilmsCount += FILMS_CARD_COUNT_PER_STEP;

    if (renderedFilmsCount >= movies.length) {
      showMoreButton.remove();
    }
  });
}

render(filmsElement, createFilmsListTemplate('Top rated', true, 'top-rated'), 'beforeend');

const topRatedFilmsListElement = filmsElement.querySelector('#top-rated');
const topRatedFilmsListContainerElement = topRatedFilmsListElement.querySelector('.films-list__container');

for (let i = 0; i < EXTRA_FILMS_CARD_COUNT; i++) {
  render(topRatedFilmsListContainerElement, createFilmCardTemplate(movies[i]), 'beforeend');
}

render(filmsElement, createFilmsListTemplate('Most commented', true, 'most-commented'), 'beforeend');

const mostCommentedFilmsListElement = filmsElement.querySelector('#most-commented');
const mostCommentedFilmsListContainerElement = mostCommentedFilmsListElement.querySelector('.films-list__container');

for (let i = 0; i < EXTRA_FILMS_CARD_COUNT; i++) {
  render(mostCommentedFilmsListContainerElement, createFilmCardTemplate(movies[i]), 'beforeend');
}

render(footerElement, createFilmDetailsTemplate(movies[0]), 'afterend');
