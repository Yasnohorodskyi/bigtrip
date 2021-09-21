import AbstractView from './abstract.js';

const SORTERS = [
  {item: 'Day',
    isChecked: 'disabled',
    itemData: '',
  },
  {item: 'Event',
    isChecked: '',
    itemData: 'data-sort-type="event"',
  },
  {item: 'Time',
    isChecked: '',
    itemData: 'data-sort-type="time"',
  },
  {item: 'Price',
    isChecked: '',
    itemData: 'data-sort-type="price"',
  },
  {item: 'Offers',
    isChecked: 'disabled',
    itemData: '',
  },
];

const createSorter = () => {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${SORTERS.map((sortersItem) => `<div class="trip-sort__item  trip-sort__item--${sortersItem.item.toLowerCase()}">
    <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" ${sortersItem.isChecked}>
    <label class="trip-sort__btn" for="sort-day" ${sortersItem.itemData}>${sortersItem.item}</label>
    </div>`).join(' ')}

    </form>`
  );
};

export default class Sorter extends AbstractView{
  constructor() {
    super();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSorter();
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
