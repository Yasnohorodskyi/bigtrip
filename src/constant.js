import {nanoid} from 'nanoid';

export const EVENTS_COUNT = 3;
export const CITIES = ['Lisbon', 'Sintra', 'Vila Nova de Gaia', 'Porto', 'Loures', 'Cascais', 'Braga'];
export const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'transport', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
export const EVENT_TYPES_IN_POINT = ['check-in', 'sightseeing', 'restaurant'];
export const EVENT_TYPES_BY_TRANSPORT = ['taxi', 'bus', 'train', 'ship', 'transport', 'drive', 'flight'];

export const EMPTY_EVENT = {
  destination: CITIES[0],
  dateFrom: new Date().toISOString(),
  dateTo: new Date().toISOString(),
  basePrice: 0,
  isFavorite: false,
  type: EVENT_TYPES[0],
  offers: [
    {
      id: nanoid(),
      offerTytle: 'Upgrade to a business class',
      offerPrice: 120,
      isChecked: false,
    },
    {
      id: nanoid(),
      offerTytle: 'Choose the radio station',
      offerPrice: 30,
      isChecked: false,
    },
    {
      id: nanoid(),
      offerTytle: 'choose temperature',
      offerPrice: 60,
      isChecked: false,
    },
    {
      id: nanoid(),
      offerTytle: 'Drive quickly, I\'m in a hurry',
      offerPrice: 120,
      isChecked: false,
    },
    {
      id: nanoid(),
      offerTytle: 'Drive slowly',
      offerPrice: 110,
      isChecked: false,
    },
  ],
};

export const SortType = {
  EVENT: 'event',
  PRICE: 'price',
  TIME: 'time',
};

export const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

export const MenuItem = {
  TABLE: 'table',
  STATS: 'stats',
};

export const ActionIcon = {
  'taxi': '🚕',
  'bus': '🚌',
  'train': '🚂',
  'ship': '🚢',
  'transport': '🚙',
  'drive': '🚗',
  'flight': '✈️',
  'check-in': '🏨',
  'sightseeing': '🏛',
  'restaurant': '🍴',
};

export const ChartType = {
  MONEY: 'MONEY',
  TRANSPORT: 'TRANSPORT',
  TIME_SPENT: 'TIME SPENT',
};
