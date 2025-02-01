const apiKey = "Your api key";
const button = document.getElementById("myButton");
const errorContainer = document.getElementById("error");
const movieCard = document.getElementById("movieCard");
button.addEventListener("click", () => {
    const movieName = document.getElementById("input").value.trim();
    if (!movieName) {
        alert("Please enter a valid movie name.");
        return;
    }
    const url = `https://www.omdbapi.com/?t=${movieName}&apikey=${apiKey}`;
    document.getElementById("loading").style.visibility = "visible";

    fetch(url)
        .then(response => {
            document.getElementById("loading").style.visibility = "hidden";
            if (!response.ok) {
                throw new Error("Something went wrong");
            }
            return response.json();
        })
        .then(value => {
            if (value.Response === "False") {
                errorContainer.style.visibility = "visible";
                throw new Error(value.Error || "Movie not found.");
            }
            movieCard.style.visibility = "visible";
            errorContainer.style.visibility = "hidden";
            updateMovieCard(value);
        })
        .catch(error => {
            console.error(error);
            movieCard.style.visibility = "hidden";
            errorContainer.style.visibility = "visible";
        });
});

function updateMovieCard(data) {
    const name = document.getElementById("name");
    const year = document.getElementById("year");
    const rating = document.getElementById("rating");
    const awards = document.getElementById("awards");
    const director = document.getElementById("director");
    const writer = document.getElementById("writer");
    const actors = document.getElementById("actors");
    const plot = document.getElementById("plot");
    const poster = document.getElementById("image");

    name.textContent = data.Title || "N/A";
    year.textContent = data.Released || "N/A";
    rating.textContent = `⭐Rating: ${data.imdbRating || "N/A"}/10`;
    awards.textContent = data.Awards || "N/A";
    director.textContent = `Director: ${data.Director || "N/A"}`;
    writer.textContent = `Writer: ${data.Writer || "N/A"}`;
    actors.textContent = `Stars: ${data.Actors || "N/A"}`;
    plot.textContent = data.Plot || "N/A";
    data.Poster !== "N/A" ? poster.src = data.Poster : poster.src = "./movie.png";
}
