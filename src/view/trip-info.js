import AbstractView from './abstract.js';
import {humanizeDateDay} from '../utils/date.js';

const getTripChain = (events) => {
  const tripSet = new Set();
  for (const event of events) {
    tripSet.add(event.destination);
  }

  const tripList = Array.from(tripSet);
  if (tripList.length <= 3) {
    return `<h1 class="trip-info__title">${tripList.map((city) => `${city} &mdash; `).join('')}</h1>`;
  }
  return `<h1 class="trip-info__title">${tripList[0]} &mdash; ... &mdash; ${tripList[tripList.length - 1]}</h1>`;
};

const getTriRange = (events) => {
  if (events.length !== 0) {
    const startDate = humanizeDateDay(events[0].dateFrom);
    const endDate = new Date(events[events.length - 1].dateTo);
    return `<p class="trip-info__dates">${startDate}&nbsp;&mdash;&nbsp;${endDate.getDate()}</p>`;
  }
  return '';
};

const getOffersPrice = (offer) => {
  return offer.reduce((total, offer) => {
    if(offer.isChecked) {
      return total + offer.offerPrice;
    }
    return total;
  }, 0);
};

const getEventsPrice = (events) => {
  return events.reduce ((total, event) => {
    return total + event.basePrice + getOffersPrice(event.offers);
  }, 0);
};

const createTripInfo = (events) => {
  const tripChain = getTripChain(events);
  const tripRange = getTriRange(events);
  const isEventsEmpty = events.length === 0;
  const eventsPrice = getEventsPrice(events);

  return (
    `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      ${!isEventsEmpty ? tripChain : ''}
      ${!isEventsEmpty ? tripRange : ''}
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${eventsPrice}</span>
    </p>
  </section>`
  );
};

export default class TripInfo extends AbstractView {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return createTripInfo(this._events);
  }
}
