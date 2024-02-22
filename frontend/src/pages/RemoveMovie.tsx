// pages/RemoveMovie.tsx
import React, { useEffect, useState } from "react";
import { getMoviesHandler } from "../handlers/movieHandler";
import MovieCard from "../components/MovieCard";

const RemoveMovie = () => {
  const [title, setTitle] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMoviesHandler().then((data) => setMovies(data));
  }, []);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("Film à supprimer :", title);
    setTitle(""); // Réinitialise le titre après la soumission
  };

  return (
    <div className="formContainer removeMovieContainer">
      <div className="removeMovieForm">
        <h1 style={{ textAlign: "center" }}>Retirer un film</h1>
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
          <button type="submit">Supprimer</button>
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
