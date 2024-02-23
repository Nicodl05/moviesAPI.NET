using MoviesAPI.Models;
using MoviesAPI;
using System.Collections.Generic;
public class User
{

    // définis un user
    public string? Name { get; set; }
    public string? Password { get; set; }
    public string? Email { get; set; }

    public bool Admin { get; set; }

    public decimal Money { get; set; }

    public List<string> rentedmovies { get; set; }
    public User()
    {
    }
    public User(string name, string password, string email)
    {
        Name = name;
        Password = password;
        Email = email;
        Admin = false;
        rentedmovies = new List<string>();
        Money = 0;
    }
    public User(string name, string password, string email, bool admin)
    {
        Name = name;
        Password = password;
        Email = email;
        Admin = admin;
        rentedmovies = new List<string>();
        Money = 0;
    }

    public string ToString()
    {
        string rented = "";
        if (Admin)
        {
            foreach (var movie in rentedmovies)
            {
                rented += movie + " ";
            }
            return "Admin: " + Name + " " + Email + " " + rented;
        }
        else
        {
            foreach (var movie in rentedmovies)
            {
                rented += movie + " ";
            }
            return "User: " + Name + " " + Email + " " + rented;
        }
    }
    public void RentMovie(string movie)
    {
        rentedmovies.Add(movie);
    }
    public void ReturnMovie(string movie)
    {
        rentedmovies.Remove(movie);
    }
    public void AddMoney(decimal money)
    {
        Money += money;
    }
    public void Pay(decimal money)
    {
        Money -= money;
    }
    public bool IsAdmin()
    {
        return Admin;
    }
    public bool CanRent()
    {
        return Money > 0;
    }
    public List<string> GetRentedMovies()
    {
        return rentedmovies;
    }



}