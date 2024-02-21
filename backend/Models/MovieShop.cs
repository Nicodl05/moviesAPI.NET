using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;

namespace MoviesAPI.Models
{
    public class MovieShop
    {
        // défini les propriétés de la classe MovieShop, c'est une boutique de films qui loue des films
        private List<Movie> movies { get; set; }

        public MovieShop()
        {

            movies = new List<Movie>();

        }
        public void AddMovie(Movie movie)
        {
            movies.Add(movie);
        }
        public void DeleteMovie(Movie movie)
        {
            movies.Remove(movie);
        }

        public IEnumerable<Movie> GetAllMovies() => movies;

        public Movie? GetMovieById(Guid id) => movies.FirstOrDefault(m => m.Id == id);

        public IEnumerable<Movie> GetMoviesByName(string name) => movies.Where(m => m.Title.Equals(name));
    }
}