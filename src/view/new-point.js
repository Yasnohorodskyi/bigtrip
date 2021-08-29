import {EVENT_TYPES, EVENT_TYPES_IN_POINT, CITIES, EMPTY_EVENT} from '../constant.js';
import {humanizeDate, humanizeTime} from '../utils/date.js';
import {getUpCasePhrase, getName} from '../utils/common.js';
import {destinationList} from '../mock/destination.js';

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
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${getName(offer.offerTytle)}-1" type="checkbox" name="event-offer-${getName(offer.offerTytle)}" ${offer.isChecked ? 'checked' : ''}>
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

export const createNewPointElement = (event = EMPTY_EVENT) => {
  const {destination, dateFrom, dateTo, basePrice, type, offers} = event;

  const eventTypeMenuList = createEventTypeMenuListTemplate(EVENT_TYPES, type);
  const cityList = createCityListTemplate(CITIES);
  const typeUp = getUpCasePhrase(type);
  const action = EVENT_TYPES_IN_POINT.includes(type) ? 'in' : 'to';
  const startTime = humanizeTime(dateFrom);
  const startDate = humanizeDate(dateFrom);
  const endTime = humanizeTime(dateTo);
  const endDate = humanizeDate(dateTo);
  const offersList = offers[0];
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
