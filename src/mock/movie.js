import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { cutNumber, getRandom, getRandomInteger, getRandomValueFromArray } from '../utils/math.js';
import { generateComment } from './comment.js';
import { ACTORS, AGES, ALTERNATIVE_TITLES, DIRECTORS, GENRES, MOVIE_POSTERS, MOVIE_TITLES, RELEASE_COUNTRIES, WRITERS, DESCRIPTION_SENTENCES } from './const.js';

const MIN_DESCRIPTION_SENTENCES = 1;
const MAX_DESCRIPTION_SENTENCES = 5;
const MIN_RUNTIME_VALUE = 73;
const MAX_RUNTIME_VALUE = 206;
const MAX_ID_VALUE = 1000000;

const generateId = () => Math.random() * MAX_ID_VALUE;

const generateTitle = () => getRandomValueFromArray(MOVIE_TITLES);

const generateAlternativeTitle = () => getRandomValueFromArray(ALTERNATIVE_TITLES);

const generateTotalRating = () => {
  const randomFloatingNumber = getRandom(5, 10);
  const rating = Number(cutNumber(randomFloatingNumber, 1));
  return rating;
};

const generatePoster = () => getRandomValueFromArray(MOVIE_POSTERS);

const generateAgeRating = () => getRandomValueFromArray(AGES);

const generateDirector = () => getRandomValueFromArray(DIRECTORS);

const generateWriters = () => {
  const randomWritersQuantity = getRandomInteger(1, 6);
  const writers = [];

  for (let i = 0; i < randomWritersQuantity; i++) {
    const writer = getRandomValueFromArray(WRITERS);

    if (writers.includes(writer)) {
      i--;
    } else {
      writers.push(writer);
    }
  }

  return writers;
};

const generateActors = () => {
  const randomActorsQuantity = getRandomInteger(1, 9);
  const actors = [];

  for (let i = 0; i < randomActorsQuantity; i++) {
    const actor = getRandomValueFromArray(ACTORS);

    if (actors.includes(actor)) {
      i--;
    } else {
      actors.push(actor);
    }
  }

  return actors;
};

const generateDate = (rangeYears = [1999, 2019]) => {
  const [yearFrom, yearTo] = rangeYears;

  const randomYear = getRandomInteger(yearFrom, yearTo);
  const randomMonth = getRandomInteger(0, 11);
  const randomDate = getRandomInteger(1, 31);
  const randomHour = getRandomInteger(0, 23);
  const randomMinute = getRandomInteger(0, 59);
  const randomSecond = getRandomInteger(0, 59);

  dayjs.extend(utc);

  const date = dayjs()
    .year(randomYear)
    .month(randomMonth)
    .date(randomDate)
    .hour(randomHour)
    .minute(randomMinute)
    .second(randomSecond);

  return date.utc().format();
};

const generateRelease = () => ({
  date: generateDate(),
  releaseCountry: getRandomValueFromArray(RELEASE_COUNTRIES),
});

const generateRuntime = () => getRandomInteger(MIN_RUNTIME_VALUE, MAX_RUNTIME_VALUE);

const generateGenre = () => {
  const randomGenreQuantity = getRandomInteger(1, 5);
  const genres = [];

  for (let i = 0; i < randomGenreQuantity; i++) {
    const genre = getRandomValueFromArray(GENRES);
    if (genres.includes(genre)) {
      i--;
    } else {
      genres.push(genre);
    }
  }

  return genres;
};

const generateDescription = (rangeMinMax = [MIN_DESCRIPTION_SENTENCES, MAX_DESCRIPTION_SENTENCES]) => {
  const [min, max] = rangeMinMax;
  const description = [];
  const randomSentencesQuantity = getRandomInteger(min, max);

  for (let i = 0; i < randomSentencesQuantity; i++) {
    const randomSentenceIndex = getRandomInteger(0, DESCRIPTION_SENTENCES.length - 1);

    if (description.includes(DESCRIPTION_SENTENCES[randomSentenceIndex])) {
      i--;
    } else {
      description.push(DESCRIPTION_SENTENCES[randomSentenceIndex]);
    }
  }

  return description.join(' ');
};

const generateWatchlist = () => !!getRandomInteger(0, 1);

const generateAlreadyWatched = () => !!getRandomInteger(0, 1);

const generateWatchingDate = (alreadyWatched) => {
  if (!alreadyWatched) {
    return null;
  }

  const date = generateDate([2017, 2020]);

  return date;
};

const generateFavorite = () => !!getRandomInteger(0, 1);

const allComments = new Array(50).fill().map(generateComment);
const commentsIds = allComments.map((comment) => comment.id);

const generateComments = () => {
  const randomCommentsQuantity = getRandomInteger(1, 5);
  const comments = [];

  for (let i = 0; i < randomCommentsQuantity; i++) {
    const commentId = getRandomValueFromArray(commentsIds);

    if (comments.includes(commentId)) {
      i--;
    } else {
      comments.push(commentId);
    }
  }

  return comments;
};

const generateMovie = () => {
  const alreadyWatched = generateAlreadyWatched();
  const watchingDate = generateWatchingDate(alreadyWatched);

  return {
    id: generateId(),
    filmInfo: {
      title: generateTitle(),
      alternativeTitle: generateAlternativeTitle(),
      totalRating: generateTotalRating(),
      poster: generatePoster(),
      ageRating: generateAgeRating(),
      director: generateDirector(),
      writers: generateWriters(),
      actors: generateActors(),
      release: generateRelease(),
      runtime: generateRuntime(),
      genre: generateGenre(),
      description: generateDescription(),
    },
    userDetails: {
      watchlist: generateWatchlist(),
      alreadyWatched: alreadyWatched,
      watchingDate: watchingDate,
      favorite: generateFavorite(),
    },
    comments: generateComments(),
  };
};

export { generateId, generateDescription, generateDate, generateMovie };
