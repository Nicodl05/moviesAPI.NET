// Home.tsx
import React from "react";
import MovieCard from "./components/MovieCard";
import { movies as movieData } from "./data/movies";
import { useEffect, useState } from "react";
import { getMoviesHandler } from "./handlers/movieHandler";

const Home: React.FC = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMoviesHandler().then((data) => setMovies(data));
  }, []);
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>MyMovieShop</h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {movies.map((movie: any) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}

        {/* {movieData.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))} */}
      </div>
    </div>
  );
};

export default Home;