import AbstractView from './abstract.js';

const createFooterStatisticsTextTemplate = (movies) => (`
  <p>${movies.length} movies inside</p>
`);

export default class FooterStatisticsText extends AbstractView {
  constructor(movies) {
    super();
    this._movies = movies;
  }

  getTemplate() {
    return createFooterStatisticsTextTemplate(this._movies);
  }
}
