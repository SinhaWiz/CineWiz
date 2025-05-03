// script.js

const API_KEY = "450fcb8e"; // Your OMDb API key
const movieGrid = document.getElementById("movies");

// Fetch movies from OMDb API
async function searchMovies() {
    const searchQuery = document.getElementById("searchInput").value;
    if (!searchQuery) {
        alert("Please enter a movie name!");
        return;
    }

    const response = await fetch(
        `https://www.omdbapi.com/?s=${searchQuery}&apikey=${API_KEY}`
    );
    const data = await response.json();

    if (data.Response === "True") {
        displayMovies(data.Search);
    } else {
        movieGrid.innerHTML = `<p>No movies found. Try another search!</p>`;
    }
}

// Display movies in the grid
function displayMovies(movies) {
    movieGrid.innerHTML = movies
        .map(
            (movie) => `
            <div class="movie-card">
                <img src="${movie.Poster}" class="movie-poster" alt="${movie.Title}">
                <div class="movie-info">
                    <h3>${movie.Title}</h3>
                    <p>Year: ${movie.Year}</p>
                    <p>Type: ${movie.Type}</p>
                </div>
            </div>
        `
        )
        .join("");
}

// Star rating functionality
let currentRating = 0;

function rateMovie(rating) {
    currentRating = rating;
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        star.classList.toggle('active', index < rating);
    });
}

// Review form submission
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('reviewForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const movieTitle = document.getElementById('movieTitle').value;
        const review = document.getElementById('review').value;

        if (currentRating === 0) {
            alert('Please select a rating!');
            return;
        }

        alert(`Review submitted successfully!\nRating: ${currentRating}/5`);
        document.getElementById('reviewForm').reset();
        const stars = document.querySelectorAll('.star');
        stars.forEach(star => star.classList.remove('active'));
        currentRating = 0;
    });

    // Set footer year
    document.getElementById('year').textContent = new Date().getFullYear();
});
