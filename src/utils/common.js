import {getEventTimeDelta} from './date.js';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getUpCasePhrase = (phrase) => {
  if (phrase !== '') {
    return [...phrase][0].toUpperCase() + phrase.slice(1);
  }
  return '';
};

export const getName = (phrase) => {
  return phrase.toLowerCase().split(' ').join('-');
};

export const getTytleFromName = (phrase) => {

  const phraseArray = [];
  const phraseSplit = phrase.split('-');
  phraseArray[0] = getUpCasePhrase(phraseSplit[2]);
  return phraseArray.concat(phraseSplit.slice(3)).join(' ');
};

export const sorterByField = (field) => {
  return (a, b) => a[field] > b[field] ? -1 : 1;
};

export const sorterByDate = (dateFrom, dateTo) => {
  return (a, b) => getEventTimeDelta(a[dateFrom], a[dateTo]) > getEventTimeDelta(b[dateFrom], b[dateTo])? -1 : 1;
};

export const isEventRepeating = (repeating) => {
  return Object.values(repeating).some(Boolean);
};
