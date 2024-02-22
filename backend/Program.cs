
using MoviesAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Builder;


var builder = WebApplication.CreateBuilder(args);

// Ajoutez vos services ici
builder.Services.AddSingleton<MovieShop>();
builder.Services.AddHttpClient<TMDbService>(client =>
{
    client.BaseAddress = new Uri("https://api.themoviedb.org/3/");
});
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
        builder.WithOrigins("http://localhost:3000") // Remplacez par l'URL de votre application frontend
               .AllowAnyMethod()
               .AllowAnyHeader());
});
var env = builder.Environment;
var app = builder.Build();
app.UseStaticFiles();



app.UseCors();

// Utilisez l'injection de dépendances pour obtenir une instance de MovieShop
var movieShop = app.Services.GetRequiredService<MovieShop>();

// Exemple d'utilisation
var scope = app.Services.CreateScope();
var tmdbService = scope.ServiceProvider.GetRequiredService<TMDbService>();

// Exemple : Rechercher et ajouter des films spécifiques à MovieShop
var moviesToAdd = new List<string> { "Narnia", "Harry Potter", "Star Wars", "The Lord of the Rings" }; // Liste des titres de films à rechercher
foreach (var title in moviesToAdd)
{
    var movies = await tmdbService.SearchMoviesByTitleAsync(title);
    movieShop.AddMovie(movies);
}

app.MapGet("/", () => "Hello World!");

app.MapGet("/movies", () => movieShop.GetAllMovies());


app.MapGet("/movies/name/{name}", (string name, [FromServices] MovieShop movieShop) =>
{
    var movie = movieShop.GetMovieByName(name);
    return movie != null ? Results.Ok(movie) : Results.NotFound($"Movie with name '{name}' not found.");
});

app.MapPost("/movies/add", async ([FromBody] MovieName movieToAdd, [FromServices] TMDbService tmdbService, [FromServices] MovieShop movieShop) =>
{
    var movie = await tmdbService.SearchMoviesByTitleAsync(movieToAdd.Name);
    if (movie == null)
    {
        return Results.NotFound($"Movie with title '{movieToAdd.Name}' not found.");
    }
    else
    {
        movieShop.AddMovie(movie);
        return Results.Created($"/movies/{movie.Title}", movie);
    }
});
app.MapDelete("/movies/delete", async ([FromBody] MovieName movieToDelete, [FromServices] MovieShop movieShop, [FromServices] TMDbService tmdbService) =>
{
    var movieFromTMDb = await tmdbService.SearchMoviesByTitleAsync(movieToDelete.Name);
    if (movieFromTMDb != null)
    {
        var movieFromShop = movieShop.FindMovieWithTitleFromUserInput(movieFromTMDb.Title);
        if (movieFromShop != null)
        {
            movieShop.DeleteMovie(movieFromShop);
            return Results.Ok($"Movie '{movieFromShop.Title}' has been deleted.");
        }
        else
        {
            return Results.NotFound($"Movie with title: {movieFromTMDb.Title} not found in the shop.");
        }
    }
    else
    {
        return Results.NotFound($"Movie with title: {movieToDelete.Name} not found in the TMDb.");
    }
});
app.Run();