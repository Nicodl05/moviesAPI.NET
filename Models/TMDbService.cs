using MoviesAPI;
using Newtonsoft.Json;


public class TMDbService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;

    public TMDbService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _apiKey = configuration["TMDb:ApiKey"];
    }
    public async Task<Movie> SearchMoviesByTitleAsync(string title)
    {
        var response = await _httpClient.GetAsync($"search/movie?api_key={_apiKey}&query={Uri.EscapeDataString(title)}"); //recherche de films
        response.EnsureSuccessStatusCode(); //  exception si pas de success
        var content = await response.Content.ReadAsStringAsync(); //  le contenu de la réponse

        var searchResult = JsonConvert.DeserializeObject<SearchResult>(content); // on le fout en json et on a le result de notre query
        var firstMovieResult = searchResult?.Results?.FirstOrDefault();

        dynamic? preciseAccessibleSearchResult = JsonConvert.DeserializeObject(content); // dynamic? means nullable
        var movieWanted = preciseAccessibleSearchResult?.results[0];


        Console.WriteLine(movieWanted);
        if (firstMovieResult != null)
        {
            var movie = new Movie
            {
                Title = firstMovieResult.Title,
                Description = firstMovieResult.Overview,
                Year = movieWanted?.release_date,
                Image = $"https://image.tmdb.org/t/p/w500{movieWanted?.poster_path}"
            };

            // Récupérer les crédits pour obtenir le réalisateur, si nécessaire
            var creditsResponse = await _httpClient.GetAsync($"movie/{firstMovieResult.Id}/credits?api_key={_apiKey}");
            creditsResponse.EnsureSuccessStatusCode();
            var creditsContent = await creditsResponse.Content.ReadAsStringAsync();
            var creditsResult = JsonConvert.DeserializeObject<CreditsResult>(creditsContent);

            movie.Director = creditsResult?.Crew.FirstOrDefault(c => c.Job == "Director")?.Name;

            return movie;
        }

        return null;
    }

    internal async Task<Movie?> SearchMovieByTitleAsync(string name)
    {
        throw new NotImplementedException();
    }

    private class SearchResult
    {
        public List<MovieResult> Results { get; set; } = new List<MovieResult>();
    }

    private class MovieResult
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Overview { get; set; }
        public string? ReleaseDate { get; set; }
    }
    private class CreditsResult
    {
        public List<Crew> Crew { get; set; } = new List<Crew>();
    }

    private class Crew
    {
        public string Job { get; set; }
        public string Name { get; set; }
    }
}
