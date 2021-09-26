import SiteMenuView from './view/menu.js';
import FiltersView from './view/filters.js';
import BoardPresenter from './presenter/board.js';

import {render} from './utils/render.js';


//mock data
import {generateEvents} from './mock/events.js';

const EVENTS_COUNT = 3;

const eventsList = generateEvents(EVENTS_COUNT);
// элементы в базовом index.html
const siteMainElement = document.querySelector('.page-body');
const tripInfoElement = siteMainElement.querySelector('.trip-main');
const menuElement = siteMainElement.querySelector('.trip-controls__navigation');
const filtersElement = siteMainElement.querySelector('.trip-controls__filters');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

render(menuElement, new SiteMenuView());
render(filtersElement, new FiltersView());

const boardPresenter = new BoardPresenter(tripInfoElement,  tripEventsElement);
boardPresenter.init(eventsList);

