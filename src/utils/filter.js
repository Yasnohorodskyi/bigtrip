import {FilterType} from '../constant.js';
import moment from 'moment';

export const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => moment(event.dateFrom).isAfter(new Date())),
  [FilterType.PAST]: (events) => events.filter((event) => moment(event.dateFrom).isBefore(new Date())),
};
