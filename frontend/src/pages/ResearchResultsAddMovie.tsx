import React from "react";
import { useEffect, useState } from "react";
import { getMoviesHandler } from "../handlers/movieHandler";
import MovieCard from "../components/MovieCard";
import { addMovieHandler } from "../handlers/movieHandler";

const ResearchResultsAddMovie: React.FC = () => {
  const [movies, setMovies] = useState([]);
  const [id, SetId] = useState(0);
  // faire une classe dans le backend de resultFilms et faire un get pour les afficher ici
  useEffect(() => {
    getMoviesHandler().then((data) => setMovies(data));
  }, []);

  const handleSubmit = (event: any) => {
    event.preventDefault();

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
          id="movieId"
          name="movieId"
          value={id}
          onChange={(e) => SetId(e.target.value)}
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
