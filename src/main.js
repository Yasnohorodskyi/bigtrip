import {createMenu} from './view/menu.js';
import {createTripInfo} from './view/trip-info.js';
import {createFilters} from './view/filters.js';
import {createSorter} from './view/sorter.js';
import {createEventsList} from './view/events-list.js';
import {createNewPointElement} from './view/new-point.js';
import {createEvent} from './view/event.js';

const EVENTS_COUNT = 7;

const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector('.page-body');
const tripInfoElement = siteMainElement.querySelector('.trip-main');

render(tripInfoElement, createTripInfo(), 'afterbegin');

const menuElement = siteMainElement.querySelector('.trip-controls__navigation');

render(menuElement, createMenu());

const filtersElement = siteMainElement.querySelector('.trip-controls__filters');

render(filtersElement, createFilters());

const tripEventsElement = siteMainElement.querySelector('.trip-events');

render(tripEventsElement, createSorter());
render(tripEventsElement, createEventsList());

const eventsListElement = tripEventsElement.querySelector('.trip-events__list');
render(eventsListElement, createNewPointElement());

for (let i = 0; i < EVENTS_COUNT; i++) {
  render(eventsListElement, createEvent());
}
