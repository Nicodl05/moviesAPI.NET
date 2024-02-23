import apiConfig from "./apiConfig.json";

const url = "http://localhost:5002";

export const getMovies = async () => {
  const getMoviesEndpoint = url + apiConfig.GetMovies;
  try {
    const response = await fetch(getMoviesEndpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Error fetching movies");
    }

    const result = await response.json();
    if (result.error) {
      throw new Error(result.error);
    } else {
      return result;
    }
  } catch (error) {
    throw error;
  }
};
export const getMovie = async (name: string) => {
  const getMovieEndpoint = url + apiConfig.GetMovieByTitle;
  try {
    const response = await fetch(getMovieEndpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    } else {
      return data;
    }
  } catch (error) {
    throw error;
  }
};
export const addMovie = async (name: string) => {
  const addMovieEndpoint = url + apiConfig.AddMovie;
  try {
    const response = await fetch(addMovieEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (response.headers.get("content-type")?.includes("application/json")) {
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      } else {
        return data;
      }
    } else {
      throw new Error("The response is not a valid JSON");
    }
  } catch (error) {
    throw error;
  }
};

export const research10MoviesBasedOnTitle = async (title: string) => {
  const research10MoviesBasedOnTitleEndpoint =
    url + apiConfig.Research10MoviesBasedOnTitle.replace("{title}", title);
  try {
    const response = await fetch(research10MoviesBasedOnTitleEndpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    } else {
      return data;
    }
  } catch (error) {
    throw error;
  }
};
export const deleteMovie = async (name: string) => {
  const deleteMovieEndpoint = url + apiConfig.DeleteMovie;
  try {
    const response = await fetch(deleteMovieEndpoint, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    } else {
      return data;
    }
  } catch (error) {
    throw error;
  }
};
