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

        public List<Movie> GetAllMovies() => movies;

        public Movie? GetMovieByName(string name) => movies?.FirstOrDefault(m => m.Title.Equals(name));
        public Movie FindMovieWithTitleFromUserInput(string userInput)
        {

            foreach (var movie in movies)
            {
                Console.WriteLine(movie.Title);
                if (movie.Title.ToLower().Contains(userInput.ToLower()))
                {
                    return movie;
                }
            }
            return null;
        }
    }
}