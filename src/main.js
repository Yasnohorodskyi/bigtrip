import SiteMenuView from './view/menu.js';
import StatisticsView from './view/statistics.js';
import FilterPresenter from './presenter/filter.js';
import BoardPresenter from './presenter/board.js';
import EventsModel from './model/events.js';
import OfferssModel from './model/offers.js';

import FilterModel from './model/filter.js';
import {UpdateType, FilterType, MenuItem} from './constant.js';

import {render, remove} from './utils/render.js';


//mock data
import {offersByType} from './mock/offers.js';
import {generateEvents} from './mock/events.js';

const EVENTS_COUNT = 5;
let statisticsComponent = null;

const offersModel = new OfferssModel();
offersModel.setOffers(offersByType);

const eventsList = generateEvents(EVENTS_COUNT, offersModel.getOffers());

const eventsModel = new EventsModel();
eventsModel.setEvents(eventsList);

const filterModel = new FilterModel();


// элементы в базовом index.html
const siteMainElement = document.querySelector('.page-body');
const tripInfoElement = siteMainElement.querySelector('.trip-main');
const menuElement = siteMainElement.querySelector('.trip-controls__navigation');
const filtersElement = siteMainElement.querySelector('.trip-controls__filters');
const pageBodyElement = siteMainElement.querySelector('.board-container');
const addNewEventButton = document.querySelector('.trip-main__event-add-btn');

//render(menuElement, new SiteMenuView());

const siteMenuComponent = new SiteMenuView();
render(menuElement, siteMenuComponent);

const handleEventNewFormClose = () => {
  addNewEventButton.removeAttribute('disabled');
};

const handleSiteMenuClick = (menuItem) => {
  siteMenuComponent.setMenuItem(menuItem);

  switch (menuItem) {
    case MenuItem.TABLE:
      boardPresenter.init();
      remove(statisticsComponent);
      filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      break;
    case MenuItem.STATS:
      boardPresenter.destroy();
      boardPresenter.infoInit();
      statisticsComponent = new StatisticsView(eventsModel.getEvents());
      render(pageBodyElement, statisticsComponent);
      filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);

      break;
  }
};

const handleNewEventClick = (evt) => {
  evt.preventDefault();
  const menuToggle = document.querySelector('.trip-tabs__btn--active');

  if (menuToggle.dataset.menuType !== MenuItem.TABLE) {
    handleSiteMenuClick(MenuItem.TABLE);
  }
  filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
  boardPresenter.createEvent(handleEventNewFormClose);
  addNewEventButton.disabled = true;
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

const boardPresenter = new BoardPresenter(tripInfoElement,  pageBodyElement, eventsModel, filterModel);
const filterPresenter = new FilterPresenter(filtersElement, filterModel, eventsModel);

filterPresenter.init();
boardPresenter.init();
boardPresenter.infoInit();

// логика блока переключать подсветку на TABLE и навесить disable на кнопку new event

addNewEventButton.addEventListener('click', handleNewEventClick);

