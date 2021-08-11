const movieToFilterMap = {
  watchlist: (movies) => movies.filter((movie) => movie.userDetails.watchlist).length,
  history: (movies) => movies.filter((movie) => movie.userDetails.alreadyWatched).length,
  favorites: (movies) => movies.filter((movie) => movie.userDetails.favorite).length,
};

export const generateFilter = (movies) => Object.entries(movieToFilterMap).map(
  ([filterName, countTask]) => ({
    name: filterName,
    count: countTask(movies),
  }),
);
