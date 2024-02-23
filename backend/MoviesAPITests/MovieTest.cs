using NUnit.Framework;
using MoviesAPI;
using System;

namespace MoviesAPITests
{
    public class MovieTests
    {
        [Test]
        public void CheckifPriceOK()
        {
            var movie = new Movie();
            Assert.That(5, Is.EqualTo(movie.Price));
        }
        [Test]
        public void CheckUniqueID()
        {
            var movie = new Movie();
            Assert.That(Guid.Empty, Is.Not.EqualTo(movie.Id));
        }
        [Test]
        public void CheckConstructionMovie()
        {
            var title = "Test Title";
            var description = "Test Description";
            var price = 5;
            var year = "2022";
            var director = "Test Director";

            var movie = new Movie(title, description, price, year, director);

            Assert.That(title, Is.EqualTo(movie.Title));
            Assert.That(description, Is.EqualTo(movie.Description));
            Assert.That(price, Is.EqualTo(movie.Price));
            Assert.That(year, Is.EqualTo(movie.Year));
            Assert.That(director, Is.EqualTo(movie.Director));

        }
    }
}