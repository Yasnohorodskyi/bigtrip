import EventsBoardView from '../view/event-board';
import TripInfoView from '../view/trip-info.js';
import SorterView from '../view/sorter.js';
import EventsListView from '../view/events-list.js';
import NoEventsView from '../view/no-events.js';
import EventPresenter from './event.js';
import EventNewPresenter from './event-new.js';

import {render, RenderPosition, remove} from '../utils/render.js';
import {sorterByField, sorterByDate} from '../utils/common.js';
import {filter} from '../utils/filter.js';

import {SortType, UpdateType, UserAction} from '../constant.js';


export default class Board {
  constructor(infoContainer, boardContainer, eventsModel, filterModel) {
    this._infoContainer = infoContainer;
    this._boardContainer = boardContainer;
    this._eventsModel = eventsModel;
    this._filterModel = filterModel;

    this._eventPresenter = {};
    this._currentSortType = SortType.EVENT;
    this._tripInfoComponent = null;
    this._sortComponent = null;

    this._boardComponent = new EventsBoardView();
    this._eventListComponent = new EventsListView();
    this._noEventComponent = new NoEventsView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._eventNewPresenter = new EventNewPresenter(this._eventListComponent, this._handleViewAction);
  }

  init() {
    render(this._boardContainer, this._boardComponent);
    render(this._boardComponent,  this._eventListComponent);

    // this._renderTripInfo();
    this._renderBoard();
    this._eventsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  infoInit() {
    this._renderTripInfo();
  }

  destroy() {
    this._clearBoard({resetSortType: true});

    remove(this._eventListComponent);
    remove(this._boardComponent);

    this._eventsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createEvent(callback) {
    this._eventNewPresenter.init(callback);
  }

  _renderTripInfo() {
    const events = this._getAllEvents();

    if (events.length !== 0) {
      this._tripInfoComponent = new TripInfoView(events);
      render(this._infoContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
    }
  }

  _getEvents() {
    const filterType = this._filterModel.getFilter();
    const events = this._eventsModel.getEvents();
    const filtredEvents = filter[filterType](events);


    switch (this._currentSortType) {
      case SortType.EVENT:
        return filtredEvents.slice().sort(sorterByField('dateFrom'));
      case SortType.PRICE:
        return filtredEvents.slice().sort(sorterByField('basePrice'));
      case SortType.TIME:
        return filtredEvents.slice().sort(sorterByDate('dateFrom', 'dateTo'));
    }

    return filtredEvents;
  }

  _getAllEvents() {
    const events = this._eventsModel.getEvents();
    return events;
  }


  _handleModeChange() {
    this._eventNewPresenter.destroy();
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this._eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this._eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this._eventsModel.deleteEvent(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this._eventPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        this._clearBoard({resetSortType: true});
        this._renderBoard();
        this._renderTripInfo();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this._clearBoard({resetSortType: true});
        this._renderBoard();
        this._renderTripInfo();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearBoard();
    this._renderBoard();
    this._renderTripInfo();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SorterView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._boardComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._eventListComponent, this._handleViewAction, this._handleModeChange);
    eventPresenter.init(event);
    this._eventPresenter[event.id] = eventPresenter;
  }

  _renderEvents(events) {
    events.forEach((event) => this._renderEvent(event));
  }

  _renderNoEvents() {
    render(this._boardComponent, this._noEventComponent);
  }

  _clearBoard({resetSortType = false} = {}) {
    this._eventNewPresenter.destroy();
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};

    remove(this._sortComponent);
    remove(this._noEventComponent);
    remove(this._tripInfoComponent);

    if (resetSortType) {
      this._currentSortType = SortType.EVENT;
    }
  }

  _renderBoard() {
    const events = this._getEvents();
    const allEvents = this._getAllEvents();
    if (allEvents.length === 0) {
      this._renderNoEvents();
    } else {
      this._renderSort();
      this._renderEvents(events.slice());
    }
  }
}
