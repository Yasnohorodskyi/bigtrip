import {createMenu} from './view/menu.js';
import {createTripInfo} from './view/trip-info.js';
import {createFilters} from './view/filters.js';
import {createSorter} from './view/sorter.js';
import {createEventsList} from './view/events-list.js';
import {createNewPointElement} from './view/new-point.js';
import {createEvent} from './view/event.js';
//mock data
import {generateEvents} from './mock/events.js';
import {EMPTY_EVENT} from './constant.js';

const EVENTS_COUNT = 3;

const eventsList = generateEvents(EVENTS_COUNT);

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
render(eventsListElement, createNewPointElement(EMPTY_EVENT));
// render(eventsListElement, createNewPointElement(eventsList[0]));

for (let i = 1; i < EVENTS_COUNT; i++) {
  render(eventsListElement, createEvent(eventsList[i]));
}
