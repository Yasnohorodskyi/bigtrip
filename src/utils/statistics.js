import moment from 'moment';
import {ActionIcon, EVENT_TYPES_BY_TRANSPORT, ChartType} from '../constant.js';


// export const getItemsUniq = (items) => [...new Set(items)];

const getDurationInHours = (dateFrom, dateTo) => {
  return Math.round((moment.duration(Date.parse(dateTo) - Date.parse(dateFrom))) / 3600000);
};


export const splitEventsByChartType = (chartType, events) => {
  const filteredEvents = chartType === ChartType.TRANSPORT
    ? events.filter((event) => EVENT_TYPES_BY_TRANSPORT.includes(event.type))
    : events;
  const eventTypes = {};

  filteredEvents.forEach((event) => {
    const eventType = `${ActionIcon[event.type]} ${event.type.toUpperCase()}`;
    switch (chartType) {
      case (ChartType.MONEY):
        eventTypes[eventType] = eventTypes[eventType] ? eventTypes[eventType] + event.basePrice : event.basePrice;
        break;
      case (ChartType.TRANSPORT):
        eventTypes[eventType] = eventTypes[eventType] ? eventTypes[eventType] + 1 : 1;
        break;
      case (ChartType.TIME_SPENT):
        eventTypes[eventType] = eventTypes[eventType] ? eventTypes[eventType] + getDurationInHours(event.dateFrom, event.dateTo) : getDurationInHours(event.dateFrom, event.dateTo);
        break;
    }
  });

  return Object.entries(eventTypes);
};
