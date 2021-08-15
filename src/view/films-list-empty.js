import AbstractView from './abstract.js';

const createFilmsListEmptyTemplate = () => (
  `<h2 class="films-list__title">There are no movies in our database</h2>
`);

export default class FilmsList extends AbstractView {
  getTemplate() {
    return createFilmsListEmptyTemplate();
  }
}
