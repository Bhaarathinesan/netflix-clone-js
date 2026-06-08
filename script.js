const API_KEY = "45eda634";

const searchBtn =
document.getElementById("searchBtn");

const searchInput =
document.getElementById("searchInput");

const moviesContainer =
document.getElementById("moviesContainer");

const watchlistContainer =
document.getElementById("watchlistContainer");

const modal =
document.getElementById("movieModal");

const movieDetails =
document.getElementById("movieDetails");

/* Search Button */

searchBtn.addEventListener("click", () => {

    const movieName =
    searchInput.value.trim();

    if(movieName === ""){

        alert("Enter movie name");

        return;

    }

    searchMovies(movieName);

});

/* Enter Key Search */

searchInput.addEventListener("keypress", (e) => {

    if(e.key === "Enter"){

        searchBtn.click();

    }

});

/* Search Movies */

async function searchMovies(movie){

    const url =
    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${movie}`;

    try{

        const response =
        await fetch(url);

        const data =
        await response.json();

        displayMovies(data.Search);

    }

    catch(error){

        console.log(error);

    }

}

/* Display Movies */

function displayMovies(movies){

    moviesContainer.innerHTML = "";

    if(!movies){

        moviesContainer.innerHTML =
        "<h3>No Movies Found</h3>";

        return;

    }

    movies.forEach(movie => {

        const card =
        document.createElement("div");

        card.classList.add("movie-card");

        card.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h4>${movie.Title}</h4>
            <p>${movie.Year}</p>
        `;

        card.addEventListener("click", () => {

            getMovieDetails(movie.imdbID);

        });

        moviesContainer.appendChild(card);

    });

}

/* Close Modal */

document
.getElementById("closeModal")
.addEventListener("click", () => {

    modal.style.display = "none";

});

/* Movie Details */

async function getMovieDetails(id){

    try{

        const response =
        await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
        );

        const movie =
        await response.json();

        movieDetails.innerHTML = `

        <div class="modal-body">

            <img
            src="${movie.Poster}"
            alt="${movie.Title}">

            <div class="movie-info">

                <h2>${movie.Title}</h2>

                <p>
                    <strong>Year:</strong>
                    ${movie.Year}
                </p>

                <p>
                    <strong>Genre:</strong>
                    ${movie.Genre}
                </p>

                <p>
                    <strong>IMDb Rating:</strong>
                    ⭐ ${movie.imdbRating}
                </p>

                <p>
                    <strong>Runtime:</strong>
                    ${movie.Runtime}
                </p>

                <button
                class="watchlist-btn"
                onclick="addToWatchlist(
                    '${movie.imdbID}',
                    '${movie.Title.replace(/'/g,"\\'")}',
                    '${movie.Poster}'
                )">

                ❤️ Add to Watchlist

                </button>

                <button
class="trailer-btn"
onclick="watchTrailer('${movie.Title}')">

🎬 Watch Trailer

</button>

                <p>
                    <strong>Plot:</strong>
                    ${movie.Plot}
                </p>

            </div>

        </div>

        `;

        modal.style.display = "flex";

    }

    catch(error){

        console.log(error);

    }

}

/* Add To Watchlist */

function addToWatchlist(id,title,poster){

    let watchlist =
    JSON.parse(
        localStorage.getItem("watchlist")
    ) || [];

    const exists =
    watchlist.some(
        movie => movie.id === id
    );

    if(exists){

        alert(
            "Movie already in watchlist"
        );

        return;

    }

    watchlist.push({

        id,
        title,
        poster

    });

    localStorage.setItem(
        "watchlist",
        JSON.stringify(watchlist)
    );

    displayWatchlist();

    alert(
        "Added to Watchlist ❤️"
    );

}

/* Display Watchlist */

function displayWatchlist(){

    let watchlist =
    JSON.parse(
        localStorage.getItem("watchlist")
    ) || [];

    watchlistContainer.innerHTML = "";

    watchlist.forEach(movie => {

        const card =
        document.createElement("div");

        card.classList.add("movie-card");

        card.innerHTML = `

            <img src="${movie.poster}">

            <h4>${movie.title}</h4>

            <button
            class="remove-btn">

            Remove

            </button>

        `;

        const removeBtn =
        card.querySelector(".remove-btn");

        removeBtn.addEventListener("click", () => {

            removeMovie(movie.id);

        });

        watchlistContainer.appendChild(card);

    });

}

/* Remove Movie */

function removeMovie(id){

    let watchlist =
    JSON.parse(
        localStorage.getItem("watchlist")
    ) || [];

    watchlist =
    watchlist.filter(
        movie => movie.id !== id
    );

    localStorage.setItem(
        "watchlist",
        JSON.stringify(watchlist)
    );

    displayWatchlist();

}

/* Load Page */

window.addEventListener("load", () => {

    searchMovies("Avengers");

    displayWatchlist();

});



function watchTrailer(title){

    const query =
    encodeURIComponent(
        `${title} official trailer`
    );

    window.open(
        `https://www.youtube.com/results?search_query=${query}`,
        "_blank"
    );

}