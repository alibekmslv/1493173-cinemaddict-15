export const createFilmsListTemplate = (listTitle, extra, listId) => (
  `<section id="${listId ? listId : ''}" class="films-list ${extra ? 'films-list--extra' : ''}">
    <h2 class="films-list__title ${!extra ? 'visually-hidden' : ''}">${listTitle}</h2>
    <div class="films-list__container"></div>
  </section>`
);
