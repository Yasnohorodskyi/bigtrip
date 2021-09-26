import SmartView from './smart.js';
import {EVENT_TYPES, EVENT_TYPES_IN_POINT, CITIES, EMPTY_EVENT} from '../constant.js';
import {humanizeDate, humanizeTime} from '../utils/date.js';
import {getUpCasePhrase, getName} from '../utils/common.js';
import {destinationList} from '../mock/destination.js';
import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

import {offersByType} from '../mock/offers.js';

const getOffers = (type, offersList) => {
  const result = [];
  offersList.filter((offer) => {
    if (type === offer.typeOffer) {
      result.push(offer.offers);
    }
  });

  return result[0];
};

const createEventTypeMenuListTemplate = (eventTypeLyst, currentType) => {
  return `
    ${eventTypeLyst.map((eventType) =>
    `<div class="event__type-item">
     <input id="event-type-${eventType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${eventType} ${currentType === eventType? 'checked' : ''}>
     <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-1">${getUpCasePhrase(eventType)}</label>
     </div>`).join('')}`;
};

const createCityListTemplate = (cityList) => {
  return cityList.map((city) => `<option value="${city}"></option>`).join('');
};

const createOffersEventTemplate = (offers) => {
  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${offers.map((offer) => `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${getName(offer.offerTytle)}-1" type="checkbox" name="event-offer-${getName(offer.offerTytle)}" ${offer.id ? 'data-offer-id ="' + offer.id + '"' : ''} ${offer.isChecked ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-${getName(offer.offerTytle)}-1">
          <span class="event__offer-title">${offer.offerTytle}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${offer.offerPrice}</span>
        </label>
      </div>`).join('')}

      </div>
    </section>`
  );
};

const createPhotosListTemplate = (photosList) => {
  return photosList.map((photos) => `<img class="event__photo" src="${photos.src}" alt="Event photo"></img>`).join('');
};

const createNewPointElement = (data = EMPTY_EVENT) => {
  const {destination, dateFrom, dateTo, basePrice, type, offers} = data;

  const eventTypeMenuList = createEventTypeMenuListTemplate(EVENT_TYPES, type);
  const cityList = createCityListTemplate(CITIES);
  const typeUp = getUpCasePhrase(type);
  const action = EVENT_TYPES_IN_POINT.includes(type) ? 'in' : 'to';
  const startTime = humanizeTime(dateFrom);
  const startDate = humanizeDate(dateFrom);
  const endTime = humanizeTime(dateTo);
  const endDate = humanizeDate(dateTo);
  const offersList = offers;
  const offersEventTemplate = createOffersEventTemplate(offersList);
  const destinationPoint = destinationList.filter((dest) => dest.cityTitle === destination);
  const photosListTemplate = createPhotosListTemplate(destinationPoint[0].cityPhotos);

  return (
    `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${eventTypeMenuList}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${typeUp} ${action}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-3">
          <datalist id="destination-list-3">
            ${cityList}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDate} ${startTime}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDate} ${endTime}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      <section class="event__details">
        ${offersEventTemplate}
        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destinationPoint[0].cityDescription}</p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${photosListTemplate}
            </div>
          </div>
        </section>
      </section>
    </form>
  </li>`
  );
};

export default class NewPoint extends SmartView {
  constructor(event = EMPTY_EVENT) {
    super();

    this._data = NewPoint.parseEventToData(event);
    this._datepicker = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._basePriceInputHandler = this._basePriceInputHandler.bind(this);
    this._typeInputHandler = this._typeInputHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._offerInputHandler = this._offerInputHandler.bind(this);
    this._dateFromChangeHandler = this._dateFromChangeHandler.bind(this);
    this._dateToChangeHandler = this._dateToChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepicker();
  }

  reset(event) {
    this.updateData(
      NewPoint.parseEventToData(event),
    );
  }

  getTemplate() {
    return createNewPointElement(this._data);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this._setDatepicker();
  }

  _setDatepicker() {
    if (this._datepicker) {
      // В случае обновления компонента удаляем вспомогательные DOM-элементы,
      // которые создает flatpickr при инициализации
      this._datepicker.destroy();
      this._datepicker = null;
    }

    this._datepicker = flatpickr(
      this.getElement().querySelector('#event-start-time-1'),
      {
        'dateFormat': 'm/d/y H:i',
        time_24hr: true,
        enableTime: true,
        dateFrom: this._data.dateFrom,
        onChange: this._dateFromChangeHandler, // На событие flatpickr передаём наш колбэк
      },
    );

    this._datepicker = flatpickr(
      this.getElement().querySelector('#event-end-time-1'),
      {
        'dateFormat': 'm/d/y H:i',
        time_24hr: true,
        enableTime: true,
        dateFrom: this._data.dateFrom,
        onChange: this._dateToChangeHandler, // На событие flatpickr передаём наш колбэк
      },
    );
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.event__type-group')
      .addEventListener('input', this._typeInputHandler);

    this.getElement()
      .querySelector('.event__input--destination')
      .addEventListener('change', this._destinationChangeHandler);

    this.getElement()
      .querySelector('.event__input--price')
      .addEventListener('input', this._basePriceInputHandler);

    this.getElement()
      .querySelector('.event__available-offers')
      .addEventListener('change', this._offerInputHandler);
  }

  _typeInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value,
      offers: getOffers(evt.target.value, offersByType),
    });
  }

  _destinationChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      destination: evt.target.value,
    });
  }

  _basePriceInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      basePrice: evt.target.value,
    },true); // true не дает перерисовывать сразу после ввода
  }


  _offerInputHandler(evt) {
    const newOffersList = this._data.offers.slice().map((offer) => {
      if (offer.id === evt.target.dataset.offerId) {
        offer.isChecked = !offer.isChecked;
      }
      return offer;
    });

    this.updateData({
      offers: newOffersList,
    });
  }

  _dateFromChangeHandler([userDate]) {
    this.updateData({
      enableTime: true,
      dateFrom: userDate.toISOString(),
    }, true);
  }

  _dateToChangeHandler([userDate]) {
    this.updateData({
      enableTime: true,
      dateTo: userDate.toISOString(),
    }, true);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(this._data);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  static parseEventToData(event) {
    return Object.assign({}, event);
  }

  static parseDataToEvent(data) {
    data = Object.assign({}, data);

    return data;
  }
}
