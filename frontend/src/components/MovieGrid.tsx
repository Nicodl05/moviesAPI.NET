// components/MovieGrid.tsx
import React from "react";
import MovieCard from "./MovieCard";

interface MovieGridProps {
  movies: any[];
  showDescription: boolean;
  handleRemove?: (movie: any) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  showDescription,
  handleRemove,
}) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "1em",
      }}
    >
      {movies.map((movie: any) => (
        <div
          key={movie.id}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <MovieCard movie={movie} showDescription={showDescription} />
          {handleRemove && (
            <button
              onClick={() => handleRemove(movie)}
              style={{
                backgroundColor: "red",
                width: "100%",
                marginTop: "auto",
                height: "30px",
              }}
            >
              Supprimer
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default MovieGrid;
