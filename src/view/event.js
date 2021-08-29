// import {offersByType} from '../mock/offers.js';
import {EVENT_TYPES_IN_POINT} from '../constant.js';
import {getEventDuration, humanizeDateDay} from '../utils/date.js';
import {getUpCasePhrase} from '../utils/common.js';

const createOffersEventTemplate = (offers) => {

  const offersList = offers[0].filter((offer) => offer.isChecked);
  let offersVisibleList = [];

  if (offersList.length > 3) {
    offersVisibleList = offersList.slice(0, 2);
  } else {
    offersVisibleList = offersList.slice();
  }

  return (`<h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${offersVisibleList.map((offer) =>
      `<li class="event__offer">
            <span class="event__offer-title">${offer.offerTytle}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${offer.offerPrice}</span>
        </li>`).join('')}
     </ul>`);
};

export const createEvent = (event) => {
  const {destination, dateFrom, dateTo, basePrice, isFavorite, type, offers} = event;
  const typeEventUp = getUpCasePhrase(type);
  const action = EVENT_TYPES_IN_POINT.includes(type) ? 'in' : 'to';
  const offersEventTemplate = createOffersEventTemplate(offers);

  return (
    `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dateFrom.slice(0,10)}">${humanizeDateDay(dateFrom)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${typeEventUp} ${action} ${destination}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dateFrom.slice(0,16)}">${dateFrom.slice(11,16)}</time>
          &mdash;
          <time class="event__end-time" datetime="${dateTo.slice(0,16)}">${dateTo.slice(11,16)}</time>
        </p>
        <p class="event__duration">${getEventDuration(dateFrom, dateTo)}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      ${offersEventTemplate}
      <button class="event__favorite-btn ${isFavorite? 'event__favorite-btn--active': ''}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
  );
};

