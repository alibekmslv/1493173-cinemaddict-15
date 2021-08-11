export const getProfileRating = (filters) => {
  const historyCount = filters.find((item) => item.name === 'history').count;

  if (historyCount === 0) {
    return '';
  }

  if (historyCount <= 10) {
    return 'Novice';
  }

  if (historyCount <= 20) {
    return 'Fan';
  }

  if (historyCount >= 21) {
    return 'Movie Buff';
  }
};
