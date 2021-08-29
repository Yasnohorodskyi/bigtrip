const FILTERS = [`Everything`, `Future`, `Past`];

export const createFilters = () => {
  return (
    `<form class="trip-filters" action="#" method="get">
    ${FILTERS.map((filter) => `<div class="trip-filters__filter">
    <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
    <label class="trip-filters__filter-label" for="filter-everything">${filter}</label>
    </div>`).join(' ')}

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
  );
};
