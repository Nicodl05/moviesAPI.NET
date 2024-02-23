// Home.tsx
import React, { use } from "react";
import MovieCard from "../components/MovieCard";
import { movies as movieData } from "../data/movies";
import { useEffect, useState } from "react";
import {
  getMoviesHandler,
  research10MoviesBasedOnTitleHandler,
} from "../handlers/movieHandler";

const Home: React.FC = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMoviesHandler().then((data) => setMovies(data));
  }, []);
  useEffect(() => {
    var value = "harry potter";
    research10MoviesBasedOnTitleHandler(value).then((results) => {
      console.log(results);
    });
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
