export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getUpCasePhrase = (phrase) => {
  if (phrase !== '') {
    return phrase[0].toUpperCase() + phrase.slice(1);
  }
  return '';
};

export const getName = (phrase) => {
  return phrase.toLowerCase().split(' ').join('-');
};
