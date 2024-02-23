// addmovie.tsx
import React, { useState, useEffect } from "react";
import {
  getMoviesHandler,
  research10MoviesBasedOnTitleHandler,
} from "../handlers/movieHandler";
import MovieCard from "../components/MovieCard";
import { addMovieHandler } from "../handlers/movieHandler";
import SearchBar from "../components/SearchBar"; // Importez le nouveau composant

const AddMovie = () => {
  const [title, setTitle] = useState("");
  const [movies, setMovies] = useState([]);
  const [moviesResults, setMoviesResults] = useState([]);

  useEffect(() => {
    getMoviesHandler().then((data) => setMovies(data));
  }, []);

  const handleSearch = (event: any) => {
    const searchValue = event.target.value;
    setTitle(searchValue);

    if (searchValue.length > 0) {
      research10MoviesBasedOnTitleHandler(searchValue).then((results) => {
        setMoviesResults(results);
      });
    } else {
      setMoviesResults([]);
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (title.length > 0) {
      try {
        addMovieHandler(title).then((data) => {
          getMoviesHandler().then((data) => setMovies(data));
        });
      } catch (error) {
        console.error(error);
      }
    }
    setTitle(""); // Réinitialise le titre après la soumission
  };

  const handleSelect = (movie: string) => {
    setTitle(movie);
  };

  return (
    <div className="formContainer">
      <h1 style={{ textAlign: "center" }}>Add a Movie</h1>
      <form onSubmit={handleSubmit}>
        <SearchBar
          title={title}
          handleSearch={handleSearch}
          moviesResults={moviesResults}
          handleSelect={handleSelect}
        />
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
