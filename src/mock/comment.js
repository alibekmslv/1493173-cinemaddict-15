import { generateId, generateDate, generateDescription } from './movie.js';
import { getRandomValueFromArray } from '../utils/math.js';
import { CommentAuthors, COMMENT_EMOTIONS } from './const.js';

const generateAuthor = () => {
  const authorName = getRandomValueFromArray(CommentAuthors.NAMES);
  const authorSurname = getRandomValueFromArray(CommentAuthors.SURNAMES);

  return `${authorName} ${authorSurname}`;
};

const generateEmotion = () => getRandomValueFromArray(COMMENT_EMOTIONS);

export const generateComment = () => ({
  id: generateId(),
  author: generateAuthor(),
  emotion: generateEmotion(),
  comment: generateDescription([1, 2]),
  date: generateDate([2017, 2020]),
});

