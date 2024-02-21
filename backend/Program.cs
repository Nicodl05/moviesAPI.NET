
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

app.MapGet("/movies/{_id}", (Guid _id, [FromServices] MovieShop movieShop) =>
{
    var movie = movieShop.GetMovieById(_id);
    return movie != null ? Results.Ok(movie) : Results.NotFound($"Movie with ID {_id} not found.");
});

app.MapGet("/movies/name/{name}", (string name, [FromServices] MovieShop movieShop) =>
{
    var movie = movieShop.GetMoviesByName(name).FirstOrDefault();
    return movie != null ? Results.Ok(movie) : Results.NotFound($"Movie with name '{name}' not found.");
});

app.MapPost("/movies/add/{name}", async (string name, [FromServices] TMDbService tmdbService, [FromServices] MovieShop movieShop) =>
{
    var movie = await tmdbService.SearchMoviesByTitleAsync(name);
    if (movie == null)
    {
        return Results.NotFound($"Movie with name '{name}' not found.");
    }
    else if (movie != null)
    {
        movieShop.AddMovie(movie);
        return Results.Created($"/movies/{movie.Id}", movie);
    }
    else
    {
        return Results.BadRequest("Invalid movie data.");
    }
});
// delete
app.MapDelete("/movies/delete/{_id}", (Guid _id, [FromServices] MovieShop movieShop) =>
{
    var movie = movieShop.GetMovieById(_id);
    if (movie != null)
    {
        movieShop.DeleteMovie(movie);
        return Results.Ok($"Movie '{movie.Title}' has been deleted.");
    }
    else
    {
        return Results.NotFound($"Movie with ID {_id} not found.");
    }
});
/*
app.UseSpa(spa =>
{
    spa.Options.SourcePath = "client-app";

    if (env.IsDevelopment())
    {
        spa.UseProxyToSpaDevelopmentServer("http://localhost:3000");
    }
});*/
/*
app.MapPost("/user/loan/{_id}", (Guid _id, [FromServices] MovieShop movieShop) =>
{
    var movie = movieShop.GetMovieById(_id);
    if (movie != null)
    {
        return Results.Ok($"Movie '{movie.Title}' has been loaned to the user.");
    }
    else
    {
        return Results.NotFound($"Movie with ID {_id} not found.");
    }
});*/
app.Run();