import AbstractView from './abstract.js';

const createEventsBoardTemplate = () => {
  return `<section class="trip-events">
            <h2 class="visually-hidden">Trip events</h2>
            <!-- Сортировка -->
            <!-- Контент -->
          </section>`;
};

export default class EventsBoard extends AbstractView {

  getTemplate() {
    return createEventsBoardTemplate();
  }
}
