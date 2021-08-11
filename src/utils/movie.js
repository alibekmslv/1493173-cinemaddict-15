import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

export const getHumanizedDate = (date, format) => dayjs(date).format(format);

export const cutString = (string, symbolsQuantity) => string.length > symbolsQuantity ? `${string.slice(0, symbolsQuantity - 1)}…` : string;

export const getMainGenre = (genres) => genres[0];

export const getCommentsQuantity = (comments) => {
  if (!comments || !comments.length) {
    return '0 comments';
  }

  if (comments.length > 1) {
    return `${comments.length} comment`;
  }

  if (comments.length === 1) {
    return '1 comment';
  }
};

export const getFilmDuration = (runtime) => {
  dayjs.extend(duration);

  const filmDuration = dayjs.duration(runtime, 'minutes');
  const { hours, minutes } = filmDuration.$d;

  const durationString = `${hours ? `${hours}h ` : ''}${
    minutes ? `${minutes}m` : ''
  }`;

  return durationString;
};

export const isActive = (boolean = false) => boolean;
