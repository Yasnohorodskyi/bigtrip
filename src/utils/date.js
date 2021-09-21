export const getTripDates = (events) => {
  const dateSet = new Set();
  for (const event of events) {
    dateSet.add(event.date.startEvent.toISOString().slice(0, 10));
    dateSet.add(event.date.endEvent.toISOString().slice(0, 10));
  }

  return Array.from(dateSet);
};

export const humanizeDateDay = (tripDate) => {
  const dateDay = new Date(tripDate);
  return dateDay.toLocaleString('en-US', {day: 'numeric', month: 'short'}).toUpperCase();
};

export const humanizeDate = (tripDate) => {
  const dateDay = new Date(tripDate);
  return dateDay.toLocaleString('en-US', {day: 'numeric', month: 'numeric', year: '2-digit'});
};

export const humanizeTime = (eventDate) => {
  const eventTime = new Date(eventDate);
  return eventTime.toLocaleString('en-GB', {hour: '2-digit', minute: '2-digit'});
};

export const getEventTimeDelta = (dateFrom, dateTo) => {
  const startDate = new Date(dateFrom);
  const endDate = new Date(dateTo);

  return (endDate.getTime() - startDate.getTime()) / 60000;
};

export const getEventDuration = (dateFrom, dateTo) => {
  const delta = getEventTimeDelta (dateFrom, dateTo);
  const timeEvent = delta / 60;
  const hourEvent = Math.trunc(timeEvent);
  const minutesEvent = delta % 60;

  if (timeEvent < 1) {
    return minutesEvent + 'M';
  }
  return hourEvent + 'H ' + minutesEvent + 'M';
};
