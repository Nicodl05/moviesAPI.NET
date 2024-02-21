import React from "react";
import apiConfig from "./apiConfig.json";

const url = "http://localhost:5002";

export const getMovies = async () => {
  const getMoviesEndpoint = url + apiConfig.GetMovies;
  console.log(getMoviesEndpoint);
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
