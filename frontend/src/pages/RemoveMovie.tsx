// pages/RemoveMovie.tsx
import React, { useEffect, useState } from "react";
import { getMoviesHandler } from "../handlers/movieHandler";
import MovieCard from "../components/MovieCard";
import { deleteMovieHandler } from "../handlers/movieHandler";
import SearchBar from "../components/SearchBar";
import { Movie } from "../types/Movie";
const RemoveMovie = () => {
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    getMoviesHandler().then((data) => setMovies(data));
  }, []);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (title.length > 0) {
      try {
        deleteMovieHandler(title).then((data) => {
          getMoviesHandler().then((data) => setMovies(data));
        });
      } catch (error) {
        console.error(error);
      }
    }
    setTitle("");
    setSearch("");
  };

  const handleSelect = (movie: string) => {
    setTitle(movie);
    setSearch(movie);
  };

  return (
    <div className="formContainer removeMovieContainer">
      <div className="removeMovieForm">
        <h1 style={{ textAlign: "center" }}>Remove a movie</h1>
        <form onSubmit={handleSubmit}>
          <SearchBar
            title={search} // Utilisez l'état de recherche pour le titre
            handleSearch={(e) => setSearch(e.target.value)} // Mettez à jour l'état de recherche lorsque vous tapez
            moviesResults={movies.map((movie) => movie.title as string)} // Assurez-vous que chaque film a un titre
            handleSelect={handleSelect}
          />
          <button type="submit">Remove</button>
        </form>
      </div>

      <div className="removeMovieGrid">
        {movies.map((movie: any) => (
          <MovieCard key={movie.id} movie={movie} showDescription={true} />
        ))}
      </div>
    </div>
  );
};

export default RemoveMovie;
