import TripInfoView from '../view/trip-info.js';
import SorterView from '../view/sorter.js';
import EventsListView from '../view/events-list.js';
import NoEventsView from '../view/no-events.js';
import EventPresenter from './event.js';

import {render, RenderPosition} from '../utils/render.js';
import {updateItem, sorterByField, sorterByDate} from '../utils/common.js';

import {SortType} from '../constant.js';


export default class Board {
  constructor(infoContainer, boardContainer) {
    this._infoContainer = infoContainer;
    this._boardContainer = boardContainer;
    this._eventPresenter = {};
    this._currentSortType = SortType.EVENT;

    this._sortComponent = new SorterView();
    this._eventListComponent = new EventsListView();
    this._noEventComponent = new NoEventsView();

    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(boardEvents) {
    this._boardEvents = boardEvents.slice();
    this._sourcedBoardEvents = boardEvents.slice();
    // Метод для инициализации (начала работы) модуля,
    // малая часть текущей функции renderBoard в main.js
    this._tripInfoComponent = new TripInfoView(this._boardEvents);
    this._renderBoard();
  }

  _renderTripInfo() {
    // Метод для рендеринга компонентов трип инфо
    render(this._infoContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
  }

  _handleModeChange() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleEventChange(updatedEvent) {
    this._boardEvents = updateItem(this._boardEvents, updatedEvent);
    this._sourcedBoardEvents = updateItem(this._sourcedBoardEvents, updatedEvent);
    this._eventPresenter[updatedEvent.id].init(updatedEvent);
  }

  _sortEvents(sortType) {
    switch (sortType) {
      case SortType.PRICE:
        this._boardEvents.sort(sorterByField('basePrice'));
        break;
      case SortType.TIME:
        this._boardEvents.sort(sorterByDate('dateFrom', 'dateTo'));
        break;
      default:
        this._boardEvents = this._sourcedBoardEvents.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortEvents(sortType);
    this._clearEventList();
    this._renderEvents();
  }

  _renderSort() {
    render(this._boardContainer, this._sortComponent);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderEvent(event) {

    const eventPresenter = new EventPresenter(this._eventListComponent, this._handleEventChange, this._handleModeChange);
    eventPresenter.init(event);
    this._eventPresenter[event.id] = eventPresenter;
  }

  _clearEventList() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};
    // this._renderedTaskCount = TASK_COUNT_PER_STEP;
    // remove(this._loadMoreButtonComponent);
  }

  _renderEvents() {
    // Метод для рендеринга N-событий за раз
    this._boardEvents.forEach((boardEvent) => this._renderEvent(boardEvent));
  }

  _renderNoEvents() {
    // Метод для рендеринга заглушки
    render(this._boardContainer, this._noEventComponent);
  }

  _renderBoard() {
    // Метод для инициализации (начала работы) модуля,
    if (this._boardEvents.length === 0) {
      this._renderNoEvents();
    } else {
      this._renderTripInfo();
      this._renderSort();

      render(this._boardContainer,  this._eventListComponent);
      this._renderEvents();
    }
  }
}
