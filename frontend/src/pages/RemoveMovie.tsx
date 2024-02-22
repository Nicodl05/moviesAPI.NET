// pages/RemoveMovie.tsx
import React, { useEffect, useState } from "react";
import { getMoviesHandler } from "../handlers/movieHandler";
import MovieCard from "../components/MovieCard";
import { deleteMovieHandler } from "../handlers/movieHandler";
const RemoveMovie = () => {
  const [title, setTitle] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMoviesHandler().then((data) => setMovies(data));
  }, []);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("Film à supprimer :", title);
    if (title.length > 0) {
      try {
        deleteMovieHandler(title).then((data) => {
          console.log(data);
          getMoviesHandler().then((data) => setMovies(data));
          console.log("Film supprimé :", title);
        });
      } catch (error) {
        console.error(error);
      }
    }
    setTitle(""); // Réinitialise le titre après la soumission
  };

  return (
    <div className="formContainer removeMovieContainer">
      <div className="removeMovieForm">
        <h1 style={{ textAlign: "center" }}>Remove a movie</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="movieName">Movie: </label>
          <input
            type="text"
            id="movieName"
            name="movieName"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
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
