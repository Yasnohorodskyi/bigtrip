export const EVENTS_COUNT = 3;
export const CITIES = ['Lisbon', 'Sintra', 'Vila Nova de Gaia', 'Porto', 'Loures', 'Cascais', 'Braga'];
export const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'transport', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
export const EVENT_TYPES_IN_POINT = ['check-in', 'sightseeing', 'restaurant'];
export const EMPTY_EVENT = {
  destination: CITIES[0],
  dateFrom: null,
  dateTo: null,
  basePrice: 0,
  isFavorite: false,
  type: EVENT_TYPES[0],
  offers: [[
    {
      offerTytle: 'Upgrade to a business class',
      offerPrice: 120,
      isChecked: false,
    },
    {
      offerTytle: 'Choose the radio station',
      offerPrice: 30,
      isChecked: false,
    },
    {
      offerTytle: 'choose temperature',
      offerPrice: 60,
      isChecked: false,
    },
    {
      offerTytle: 'Drive quickly, I\'m in a hurry',
      offerPrice: 120,
      isChecked: false,
    },
    {
      offerTytle: 'Drive slowly',
      offerPrice: 110,
      isChecked: false,
    },
  ]],
};

export const SortType = {
  EVENT: 'event',
  PRICE: 'price',
  TIME: 'time',
};
