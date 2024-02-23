// Home.tsx
import React from "react";
import MovieCard from "../components/MovieCard";
import { useEffect, useState } from "react";
import { getMoviesHandler } from "../handlers/movieHandler";

const Home: React.FC = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMoviesHandler().then((data) => setMovies(data));
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {movies.map((movie: any) => (
          <MovieCard key={movie.id} movie={movie} showDescription={true} />
        ))}
      </div>
    </div>
  );
};

export default Home;
