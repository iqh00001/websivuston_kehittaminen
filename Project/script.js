const API_KEY = "6ff8091";

const button = document.getElementById("searchBtn");
const input = document.getElementById("searchInput");
const results = document.getElementById("results");

button.addEventListener("click", () => {
  const query = input.value;
  searchMovies(query);
});

async function searchMovies(query) {
  results.innerHTML = "Loading...";

  try {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
    const data = await res.json();

    if (!data.Search) {
      results.innerHTML = "No results found";
      return;
    }

    displayMovies(data.Search);

  } catch (error) {
    results.innerHTML = "Error loading data";
    console.error(error);
  }
}

function displayMovies(movies) {
  results.innerHTML = "";

  movies.forEach(movie => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h3>${movie.Title}</h3>
      <img src="${movie.Poster !== "N/A" ? movie.Poster : ""}">
      <p>${movie.Year}</p>
    `;

    results.appendChild(card);
  });
}

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchMovies(input.value);
  }
});

const loader = document.getElementById("loader");