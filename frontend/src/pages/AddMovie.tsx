// addmovie.tsx
import React, { useState, useEffect } from "react";
import { text } from "stream/consumers";
import { getMoviesHandler } from "../handlers/movieHandler";
import MovieCard from "../components/MovieCard";
const AddMovie = () => {
  const [title, setTitle] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMoviesHandler().then((data) => setMovies(data));
  }, []);
  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("Film ajouté :", title);
    setTitle(""); // Réinitialise le titre après la soumission
  };

  return (
    <div className="formContainer">
      <h1 style={{ textAlign: "center" }}>Ajouter un film</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="movieName">Nom du film :</label>
        <input
          type="text"
          id="movieName"
          name="movieName"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button type="submit">Ajouter</button>
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
