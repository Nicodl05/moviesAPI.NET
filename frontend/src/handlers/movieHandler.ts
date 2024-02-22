import { getMovies, getMovie, addMovie, deleteMovie } from "../api/moviesAPI";

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
export const getMovieHandler = async (title: string) => {
  try {
    const data = await getMovie(title);
    if (data.error) {
      throw new Error(data.error);
    } else {
      return data;
    }
  } catch (error) {
    throw error;
  }
};
export const addMovieHandler = async (title: string) => {
  try {
    console.log(title);
    const data = await addMovie(title);
    if (data.error) {
      throw new Error(data.error);
    } else {
      return data;
    }
  } catch (error) {
    throw error;
  }
};
export const deleteMovieHandler = async (title: string) => {
  try {
    const data = await deleteMovie(title);
    if (data.error) {
      throw new Error(data.error);
    } else {
      return data;
    }
  } catch (error) {
    throw error;
  }
};
