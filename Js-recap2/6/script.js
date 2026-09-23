const movies = [];

const numberOfMovies = Number(
    prompt("How many movies do you want to rate?")
);

for (let i = 0; i < numberOfMovies; i++) {
    const title = prompt(`Enter the title of movie ${i + 1}:`);
    const rating = Number(
        prompt(`Enter the rating for "${title}" (1-5):`)
    );

    const movie = {
        title: title,
        rating: rating
    };

    movies.push(movie);
}

movies.sort((a, b) => b.rating - a.rating);

const moviesElement = document.getElementById("movies");

for (const movie of movies) {
    const paragraph = document.createElement("p");

    paragraph.textContent =
        `${movie.title} - Rating: ${movie.rating}`;

    moviesElement.appendChild(paragraph);
}

if (movies.length > 0) {
    const highestRatedMovie = movies[0];

    document.getElementById("highest").textContent =
        `${highestRatedMovie.title} - Rating: ${highestRatedMovie.rating}`;
}