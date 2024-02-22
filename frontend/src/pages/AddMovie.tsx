// addmovie.tsx
import React, { useState, useEffect } from "react";
import { text } from "stream/consumers";
import { getMoviesHandler } from "../handlers/movieHandler";
import MovieCard from "../components/MovieCard";
import { addMovieHandler } from "../handlers/movieHandler";
const AddMovie = () => {
  const [title, setTitle] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMoviesHandler().then((data) => setMovies(data));
  }, []);

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

  return (
    <div className="formContainer">
      <h1 style={{ textAlign: "center" }}>Add a Movie</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="movieName">Movie name:</label>
        <input
          type="text"
          id="movieName"
          name="movieName"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button type="submit">Add</button>
        <img
          className="addMovieIcon"
          src="/images/addMovie.png"
          alt="Ajouter un film"
        />
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
