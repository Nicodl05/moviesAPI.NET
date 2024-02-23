// addmovie.tsx
import React, { useState, useEffect } from "react";
import { text } from "stream/consumers";
import {
  getMoviesHandler,
  research10MoviesBasedOnTitleHandler,
} from "../handlers/movieHandler";
import MovieCard from "../components/MovieCard";
import { addMovieHandler } from "../handlers/movieHandler";
const AddMovie = () => {
  const [title, setTitle] = useState("");
  const [movies, setMovies] = useState([]);

  const [searchResults, setSearchResults] = useState([]);
  const [moviesResults, setMoviesResults] = useState([]);

  useEffect(() => {
    getMoviesHandler().then((data) => setMovies(data));
  }, []);

  const handleSearch = (event: any) => {
    const searchValue = event.target.value;
    setTitle(searchValue);

    if (searchValue.length > 0) {
      research10MoviesBasedOnTitleHandler(searchValue).then((results) => {
        console.log(results);
        setMoviesResults(results);
      });
    } else {
      setMoviesResults([]);
    }
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("Film à ajouter :", title);
    if (title.length > 0) {
      try {
        addMovieHandler(title).then((data) => {
          console.log(data);
          getMoviesHandler().then((data) => setMovies(data));
          console.log("Film ajouté :", data.title);
        });
      } catch (error) {
        console.error(error);
      }
    }
    setTitle(""); // Réinitialise le titre après la soumission
  };
  // ...
  const handleSelect = (movie: string) => {
    setTitle(movie);
  };
  // ...
  // ...
  return (
    <div className="formContainer">
      <h1 style={{ textAlign: "center" }}>Add a Movie</h1>
      <form onSubmit={handleSubmit}>
        <div className="search-container">
          <div className="search-bar">
            <label htmlFor="movieName">Movie name:</label>
            <input
              type="text"
              id="movieName"
              name="movieName"
              value={title}
              onChange={handleSearch}
              required
            />
          </div>
          {title && (
            <div className="search-results">
              <h2>Films proposés :</h2>
              <ul>
                {moviesResults.map((movie, index) => (
                  <li key={index} onClick={() => handleSelect(movie)}>
                    {movie}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button type="submit">Add</button>
      </form>
      <div className="removeMovieGrid">
        {movies.map((movie: any) => (
          <MovieCard key={movie.id} movie={movie} showDescription={true} />
        ))}
      </div>
    </div>
  );
};

export default AddMovie;
