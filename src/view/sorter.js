import AbstractView from './abstract.js';

const SORTERS = [
  {item: 'Day',
    isAble: 'disabled',
    itemData: '',
    isCheaked: 'day',
  },
  {item: 'Event',
    isAble: '',
    itemData: 'data-sort-type="event"',
    isCheaked: 'event',
  },
  {item: 'Time',
    isAble: '',
    itemData: 'data-sort-type="time"',
    isCheaked: 'time',
  },
  {item: 'Price',
    isAble: '',
    itemData: 'data-sort-type="price"',
    isCheaked: 'price',
  },
  {item: 'Offers',
    isAble: 'disabled',
    itemData: '',
    isCheaked: 'offers',
  },
];

const createSorter = (currentSortType) => {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${SORTERS.map((sortersItem) => `<div class="trip-sort__item  trip-sort__item--${sortersItem.item.toLowerCase()}">
    <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" ${sortersItem.isAble} ${currentSortType === sortersItem.isCheaked ? 'checked' : ''}>
    <label class="trip-sort__btn" for="sort-day" ${sortersItem.itemData}>${sortersItem.item}</label>
    </div>`).join(' ')}

    </form>`
  );
};

export default class Sorter extends AbstractView{
  constructor(currentSortType) {
    super();
    this._currentSortType = currentSortType;

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSorter(this._currentSortType);
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'LABEL') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }
}
