import {nanoid} from 'nanoid';
import {getRandomInteger} from '../utils/common.js';
import {CITIES, EVENT_TYPES} from '../constant.js';

const PRICE_MULTIPLICATOR = 10;

const MIN_TIME_EVENT = 30;
const MAX_TIME_EVENT = 150;

const MIN_TIME_BETWEEN_EVENT = 240;
const MAX_TIME_BETWEEN_EVENT = 720;

const getTimePoints = (eventCounter) => {
  const timePoints = [];
  let startEndEvent = {};
  let timeGap = 0;
  let timeEventGap = 0;
  const initialDate = new Date();
  let startEventDate = new Date(initialDate.setDate(initialDate.getDate() - 1));
  let endEventDate = new Date(startEventDate);
  for (let i = 0; i < eventCounter; i++) {
    timeGap = getRandomInteger(MIN_TIME_EVENT, MAX_TIME_EVENT);
    timeEventGap = getRandomInteger(MIN_TIME_BETWEEN_EVENT, MAX_TIME_BETWEEN_EVENT);
    endEventDate = new Date(startEventDate);
    endEventDate = new Date(endEventDate.setMinutes(endEventDate.getMinutes() + timeGap));
    startEndEvent = {
      start: new Date(startEventDate),
      end: new Date(endEventDate),
    };
    timePoints.push(startEndEvent);
    startEventDate = new Date(endEventDate.setMinutes(endEventDate.getMinutes() + timeEventGap));
  }
  return timePoints;
};

const getOffers = (type, offersList) => {
  const result = [];
  offersList.map((offer) => {
    if (type === offer.typeOffer) {
      result.push(offer.offers);
    }
  });

  return result[0];
};

const getEvent = (dateList, counter, offersByType) => {
  const typeEvent = EVENT_TYPES[getRandomInteger(0, EVENT_TYPES.length-1)];
  return {
    id: nanoid(),
    destination: CITIES[getRandomInteger(0, CITIES.length-1)],
    dateFrom: dateList[counter].start.toISOString(),
    dateTo: dateList[counter].end.toISOString(),
    basePrice: getRandomInteger(10, 20) * PRICE_MULTIPLICATOR,
    isFavorite: Boolean(getRandomInteger(0, 1)),
    type: typeEvent,
    offers: getOffers(typeEvent, offersByType),
  };
};

export const generateEvents = (eventCounter, offersByType) => {
  const events = [];
  const dateList = getTimePoints(eventCounter);

  for (let i = 0; i < eventCounter; i++) {
    events.push(getEvent(dateList, i, offersByType));
  }
  return events;
};
