import ProfileView from './view/profile.js';
import MainNavigationView from './view/main-navigation.js';
import SortView from './view/sort.js';
import StatisticsView from './view/statisctics.js';
import FooterStatisticsTextView from './view/footer-statistics-text.js';
import { FILMS_CARD_COUNT } from './settings.js';
import { render, RenderPosition } from './utils/render.js';
import { generateMovie } from './mock/movie.js';
import { generateFilter } from './mock/filter.js';
import FilmsBoardPresenter from './presenter/films-board.js';

const films = new Array(FILMS_CARD_COUNT).fill().map(generateMovie);
const filters = generateFilter(films);

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

const filmsBoardPresenter = new FilmsBoardPresenter(mainElement);
filmsBoardPresenter.init(films);
