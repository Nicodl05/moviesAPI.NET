// MovieCard.tsx
import React from "react";
import { Movie } from "../types/Movie";

interface MovieCardProps {
  movie: Movie;
  showDescription: boolean; // Ajoutez cette ligne
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, showDescription }) => {
  // Ajoutez showDescription ici

  return (
    <div
      style={{
        border: "1px solid #ccc",
        width: "18%",
        padding: "10px",
        margin: "1%",
        borderRadius: "5px",
      }}
    >
      <img src={movie.image} alt="movie" style={{ width: "100%" }} />
      <h2 style={{ textAlign: "center" }}>{movie.title}</h2>
      <p>
        {movie.year} - {movie.director}
      </p>
      {showDescription && <p>{movie.description}</p>}{" "}
      {/* Ajoutez cette condition */}
    </div>
  );
};

export default MovieCard;
