import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import AsideStats from "./AsideStats";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("Avengers");

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${search}&apikey=${API_KEY}&type=movie`
      );
      if (response.data.Search) {
        // Obtener detalles de cada película
        const details = await Promise.all(
          response.data.Search.slice(0, 10).map(async (movie) => {
            const detailRes = await axios.get(
              `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`
            );
            return detailRes.data;
          })
        );
        setMovies(details);
      } else {
        setMovies([]);
      }
    };

    fetchMovies();
  }, [search]);

  return (
    <div style={{ display: "flex" }}>
      <main>
        <h1>Películas</h1>
        <button
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={() => setSearch("Avengers")}
        >
          Volver al inicio
        </button>
        <SearchBar onSearch={setSearch} />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {movies.map((movie) => (
            <div
              key={movie.imdbID}
              style={{
                border: "1px solid #ccc",
                borderRadius: 8,
                padding: 10,
                width: 200,
              }}
            >
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={movie.Title}
                style={{ width: "100%", height: 300, objectFit: "cover" }}
              />
              <h3>{movie.Title}</h3>
              <p>
                <b>Año:</b> {movie.Year}
              </p>
              <p>
                <b>Director:</b> {movie.Director}
              </p>
            </div>
          ))}
        </div>
      </main>
      <AsideStats movies={movies} />
    </div>
  );
}

export default App;
