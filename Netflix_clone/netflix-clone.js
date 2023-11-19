const api = "api_key=2ebcef56b37e6b7e935d0024e603e1ac";
const base_url = "https://api.themoviedb.org/3";
const image_url = "https://image.tmdb.org/t/p/w500";
const banner_url = "https://image.tmdb.org/t/p/original";

//request for movies data
const requests = {
    fetctTrending: `${base_url}/trending/all/week?${api}&language=en-US`,
    fetctNetflixOrignals: `${base_url}/discover/tv?${api}&with_networks=213`,
    fetctActionMovies: `${base_url}/discover/movie?${api}&with_genres=28`,
    fetctComedyMovies: `${base_url}/discover/movie?${api}&with_genres=35`,
    fetctHorrorMovies: `${base_url}/discover/movie?${api}&with_genres=27`,
    fetctRomanceMovies: `${base_url}/discover/movie?${api}&with_genres=10749`,
    fetctDocumentaries: `${base_url}/discover/movie?${api}&with_genres=99`,
};

//use to turncate the string
function truncate(str, n) {
    return str.length > n ? str.substr(0, n - 1) + "..." : str;
}

//banner
let options = {
    method: "GET"
};
fetch(requests.fetctNetflixOrignals, options)
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonData) {
        //for every refresh the movie will change
        const setMovie = jsonData.results[Math.ceil(Math.random() * jsonData.results.length - 1)];

        let bannerEl = document.getElementById("banner");
        let bannerTitleEl = document.getElementById("bannerTitle");
        let bannerDescriptionEl = document.getElementById("bannerDescription");

        bannerEl.style.backgroundImage = "url(" + banner_url + setMovie.backdrop_path + ")";
        bannerDescriptionEl.innerText = truncate(setMovie.overview, 150);
        bannerTitleEl.innerText = setMovie.name;
    });

let rowContainer = document.getElementById("moviesContainer");

//create and append movies
function createAndAppendMovies(results, title) {
    let rowTitle = document.createElement("h2");
    rowTitle.classList.add("row-heading");
    rowTitle.textContent = title;
    let rowPosters = document.createElement("div");
    rowPosters.classList.add("d-flex", "flex-row");
    let count = 0;
    for (let item of results) {
        count += 1;

        let imageEl = document.createElement("img");
        let id = item.id;
        imageEl.id = id;
        imageEl.classList.add("row-images");
        imageEl.src = image_url + item.poster_path;
        rowPosters.appendChild(imageEl);
    }
    rowContainer.appendChild(rowTitle);
    rowContainer.appendChild(rowPosters);
}

//Trending Now
fetch(requests.fetctNetflixOrignals, options)
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonData) {
        createAndAppendMovies(jsonData.results, "Trending Now");
    });

//Action Movies
fetch(requests.fetctActionMovies, options)
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonData) {
        createAndAppendMovies(jsonData.results, "Action Movies");
    });

//Comedy Movies
fetch(requests.fetctComedyMovies, options)
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonData) {
        createAndAppendMovies(jsonData.results, "Comedy Movies");
    });

//Horror Movies
fetch(requests.fetctHorrorMovies, options)
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonData) {
        createAndAppendMovies(jsonData.results, "Horror Movies");
    });

//Romance Movies
fetch(requests.fetctRomanceMovies, options)
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonData) {
        createAndAppendMovies(jsonData.results, "Romance Movies");
    });

//Documentaries
fetch(requests.fetctDocumentaries, options)
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonData) {
        createAndAppendMovies(jsonData.results, "Documentaries");
    });