
using System;

namespace MoviesAPI
{
    public class Movie
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string? Title { get; set; }
        public string? Director { get; set; }
        public string? Year { get; set; }

        public string? Description { get; set; }
        public decimal? Price { get; set; }

        public string? Image { get; set; }
        public Movie()
        {
            Price = 5;
        }
        public Movie(string title, string description, decimal price, string year, string director)
        {
            Id = Guid.NewGuid(); // Génère un identifiant unique lors de la création d'un nouveau film
            Title = title;
            Description = description;
            Price = price;
            Year = year;
            Director = director;
        }


    }
}