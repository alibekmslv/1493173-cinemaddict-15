import AbstractView from './abstract.js';

const createMainNavigationItemTemplate = (filter) => {
  const { name, count } = filter;

  return (`
    <a href="#${name}" class="main-navigation__item">${name.charAt(0).toUpperCase() + name.slice(1)} <span class="main-navigation__item-count">${count}</span></a>
  `);
};

const createMainNavigationTemplate = (filters) => {
  const mainNavigationItemTemplate = filters.map((filter) => createMainNavigationItemTemplate(filter)).join('');

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${mainNavigationItemTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class MainNavigation extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createMainNavigationTemplate(this._filters);
  }
}
