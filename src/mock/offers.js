import {getRandomInteger} from '../utils/common.js';

export const offersByType = [
  {
    typeOffer: 'taxi',
    offers: [
      {
        offerTytle: 'Upgrade to a business class',
        offerPrice: 120,
        isChecked: Boolean(getRandomInteger(0, 1)),
      },
      {
        offerTytle: 'Choose the radio station',
        offerPrice: 30,
        isChecked: Boolean(getRandomInteger(0, 1)),
      },
      {
        offerTytle: 'choose temperature',
        offerPrice: 60,
        isChecked: Boolean(getRandomInteger(0, 1)),
      },
      {
        offerTytle: 'Drive quickly, I\'m in a hurry',
        offerPrice: 120,
        isChecked: Boolean(getRandomInteger(0, 1)),
      },
      {
        offerTytle: 'Drive slowly',
        offerPrice: 110,
        isChecked: Boolean(getRandomInteger(0, 1)),
      },
    ],
  },
  {
    typeOffer: 'bus',
    offers: [
      {
        offerTytle: 'Infotainment system',
        offerPrice: 75,
        isChecked: Boolean(getRandomInteger(0, 1)),
      },
      {
        offerTytle: 'Order meal',
        offerPrice: 115,
        isChecked: Boolean(getRandomInteger(0, 1)),
      },
      {
        offerTytle: 'Choose seats',
        offerPrice: 150,
        isChecked: Boolean(getRandomInteger(0, 1)),
      },
    ],
  },
  {
    typeOffer: 'train',
    offers: [
      {
        offerTytle: 'Book a taxi at the arrival point',
        offerPrice: 75,
        isChecked: Boolean(getRandomInteger(0, 1)),
      },
      {
        offerTytle: 'Order a breakfast',
        offerPrice: 15,
        isChecked: Boolean(getRandomInteger(0, 1)),
      },
      {
        offerTytle: 'Wake up at a certain time',
        offerPrice: 10,
        isChecked: Boolean(getRandomInteger(0, 1)),
      },
    ],
  },
  {
    typeOffer: 'ship',
    offers: [
      {
        offerTytle: 'Upgrade to comfort class',
        offerPrice: 70,
        isChecked: Boolean(getRandomInteger(0, 1)),
      },
      {
        offerTytle: 'Choose seats',
        offerPrice: 190,
        isChecked: Boolean(getRandomInteger(0, 1)),
      },
      {
        offerTytle: 'Upgrade to business class',
        offerPrice: 75,
        isChecked: Boolean(getRandomInteger(0, 1)),
      },
      {
        offerTytle: 'Add luggage',
        offerPrice: 30,
        isChecked: Boolean(getRandomInteger(0, 1)),
      },
      {
        offerTytle: 'Business lounge ',
        offerPrice: 40,
        isChecked: Boolean(getRandomInteger(0, 1)),
      },
    ],
  },
  {
    typeOffer: 'transport',
    offers: [],
  },
  {
    typeOffer: 'drive',
    offers: [
      {
        offerTytle: 'Rent a car',
        offerPrice: 200,
        isChecked: Boolean(getRandomInteger(0, 1)),
      },
    ],
  },
  {
    typeOffer: 'flight',
    offers: [
      {
        offerTytle: 'Add luggage',
        offerPrice: 50,
        isChecked: Boolean(getRandomInteger(0, 1)),
      },
      {
        offerTytle: 'Switch to comfort',
        offerPrice: 80,
        isChecked: Boolean(getRandomInteger(0, 1)),
      },
    ],
  },
  {
    typeOffer: 'check-in',
    offers: [
      {
        offerTytle: 'Choose the time of check-in',
        offerPrice: 70,
        isChecked: Boolean(getRandomInteger(0, 1)),
      },
      {
        offerTytle: 'Choose the time of check-out',
        offerPrice: 190,
        isChecked: Boolean(getRandomInteger(0, 1)),
      },
      {
        offerTytle: 'Add breakfast',
        offerPrice: 50,
        isChecked: Boolean(getRandomInteger(0, 1)),
      },
      {
        offerTytle: 'Laundry',
        offerPrice: 50,
        isChecked: Boolean(getRandomInteger(0, 1)),
      },
      {
        offerTytle: 'Order a meal from the restaurant',
        offerPrice: 30,
        isChecked: Boolean(getRandomInteger(0, 1)),
      },
    ],
  },
  {
    typeOffer: 'sightseeing',
    offers: [
      {
        offerTytle: 'Book tickets',
        offerPrice: 40,
        isChecked: Boolean(getRandomInteger(0, 1)),
      },
      {
        offerTytle: 'Lunch in city',
        offerPrice: 30,
        isChecked: Boolean(getRandomInteger(0, 1)),
      },
    ],
  },
  {
    typeOffer: 'restaurant',
    offers: [
      {
        offerTytle: 'Choose live music ',
        offerPrice: 40,
        isChecked: Boolean(getRandomInteger(0, 1)),
      },
      {
        offerTytle: 'Choose VIP area',
        offerPrice: 30,
        isChecked: Boolean(getRandomInteger(0, 1)),
      },
    ],
  },
];
