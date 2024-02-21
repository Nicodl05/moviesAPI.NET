import { getMovies } from "../api/moviesAPI";

export const getMoviesHandler = async () => {
  try {
    const movies = await getMovies();
    if (!movies) {
      throw new Error("Error fetching movies");
    } else return movies;
  } catch (error) {
    throw error;
  }
};
