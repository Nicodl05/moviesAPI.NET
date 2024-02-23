// SearchBar.tsx
import React from "react";
import { Movie } from "../types/Movie";

interface SearchBarProps {
  title: string;
  handleSearch: (event: any) => void;
  moviesResults: string[];
  handleSelect: (movie: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  title,
  handleSearch,
  moviesResults,
  handleSelect,
}) => {
  return (
    <div className="search-container">
      <div className="search-bar">
        <label htmlFor="movieName">Movie name:</label>
        <input
          type="text"
          id="movieName"
          name="movieName"
          value={title}
          onChange={handleSearch}
          required
        />
      </div>
      {title && (
        <div className="search-results">
          <h2>Films proposés :</h2>
          <ul>
            {moviesResults.map((movie, index) => (
              <li key={index} onClick={() => handleSelect(movie)}>
                {movie}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
