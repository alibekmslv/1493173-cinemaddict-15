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
import { FILMS_CARD_COUNT, EXTRA_FILMS_CARD_COUNT} from './settings.js';
import { render } from './utils/render.js';

const headerElement = document.querySelector('.header');
render(headerElement, createProfileTemplate(), 'beforeend');

const mainElement = document.querySelector('.main');
render(mainElement, createMainNavigationTemplate(), 'afterbegin');

const footerElement = document.querySelector('.footer');
const footerStatistics = footerElement.querySelector('.footer__statistics');
render(footerStatistics, createFooterStatisticsTextTemplate(), 'beforeend');

const mainNavigationElement = mainElement.querySelector('.main-navigation');
render(mainNavigationElement, createSortTemplate(), 'afterend');

render(mainElement, createStatisticsTemplate(), 'beforeend');
render(mainElement, createFilmsTemplate(), 'beforeend');

const filmsElement = mainElement.querySelector('.films');
render(filmsElement, createFilmsListTemplate('All movies. Upcoming'), 'afterbegin');

const allFilmsListElement = filmsElement.querySelector('.films-list');
const allFilmsListContainerElement = allFilmsListElement.querySelector('.films-list__container');

render(allFilmsListElement, createFilmsListButtonTemplate(), 'beforeend');

for (let i = 0; i < FILMS_CARD_COUNT; i++) {
  render(allFilmsListContainerElement, createFilmCardTemplate(), 'beforeend');
}

render(filmsElement, createFilmsListTemplate('Top rated', true, 'top-rated'), 'beforeend');

const topRatedFilmsListElement = filmsElement.querySelector('#top-rated');
const topRatedFilmsListContainerElement = topRatedFilmsListElement.querySelector('.films-list__container');

for (let i = 0; i < EXTRA_FILMS_CARD_COUNT; i++) {
  render(topRatedFilmsListContainerElement, createFilmCardTemplate(), 'beforeend');
}

render(filmsElement, createFilmsListTemplate('Most commented', true, 'most-commented'), 'beforeend');

const mostCommentedFilmsListElement = filmsElement.querySelector('#most-commented');
const mostCommentedFilmsListContainerElement = mostCommentedFilmsListElement.querySelector('.films-list__container');

for (let i = 0; i < EXTRA_FILMS_CARD_COUNT; i++) {
  render(mostCommentedFilmsListContainerElement, createFilmCardTemplate(), 'beforeend');
}

render(footerElement, createFilmDetailsTemplate(), 'afterend');
