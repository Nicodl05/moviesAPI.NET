using NUnit.Framework;
using MoviesAPI;
using MoviesAPI.Models;
using System;
using System.Linq;

namespace MoviesAPITests
{
    public class MovieShopTests
    {
        private MovieShop shop;
        private Movie movie;

        [SetUp]
        public void Setup()
        {
            shop = new MovieShop();
            movie = new Movie("Test Title", "Test Description", 5, "2022", "Test Director");
            shop.AddMovie(movie);
        }

        [Test]
        public void AddMovie_AddsMovieToList()
        {
            var movieCount = shop.GetAllMovies().Count;
            Assert.That(1, Is.EqualTo(movieCount));
        }

        [Test]
        public void DeleteMovie_RemovesMovieFromList()
        {
            shop.DeleteMovie(movie);
            var movieCount = shop.GetAllMovies().Count;
            Assert.That(0, Is.EqualTo(movieCount));
        }

        [Test]
        public void GetMovieByName_ReturnsCorrectMovie()
        {
            var returnedMovie = shop.GetMovieByName("Test Title");
            Assert.That(returnedMovie, Is.EqualTo(movie));
        }

        [Test]
        public void FindMovieWithTitleFromUserInput_ReturnsCorrectMovie()
        {
            var returnedMovie = shop.FindMovieWithTitleFromUserInput("Test Title");
            Assert.That(returnedMovie, Is.EqualTo(movie));
        }
    }
}