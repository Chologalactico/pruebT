import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import AsideStats from "./AsideStats";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("Avengers");
  // todo: agregar loading, para mostrar un skeletion y tambien si no enceuntra resultados
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
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
      setIsLoading(false);
    };

    fetchMovies();
  }, [search]);

  const closeModal = () => setSelectedMovie(null);

  return (
    <div
      style={{
        display: "flex",
        background: "#e9ecef",
        minHeight: "100vh",
        flexDirection: "column",
        padding: 0,
      }}
    >
      <div
        style={{
          width: "100%",
          background: "#2c3e50",
          padding: "18px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
          marginBottom: 32,
        }}
      >
        <span
          style={{
            color: "#fff",
            fontSize: 28,
            fontWeight: "bold",
            letterSpacing: 1,
          }}
        >
          Películas
        </span>
      </div>
      <div style={{ display: "flex", padding: 32 }}>
        <main style={{ flex: 1, marginRight: 32 }}>
          <h1
            style={{
              fontSize: 32,
              color: "#2c3e50",
              marginBottom: 16,
              fontWeight: "bold",
            }}
          >
            Películas
          </h1>
          <button
            style={{
              marginBottom: 16,
              padding: "10px 24px",
              background: "#2980b9",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.background = "#1c5980")}
            onMouseOut={(e) => (e.target.style.background = "#2980b9")}
            onClick={() => setSearch("Avengers")}
          >
            Volver al inicio
          </button>
          <SearchBar onSearch={setSearch} isLoading={isLoading} />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1.5rem",
              marginTop: 24,
            }}
          >
            {isLoading ? (
              // Skeleton loader
              [...Array(6)].map((_, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: 12,
                    padding: 16,
                    width: 220,
                    background: "#fff",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: 300,
                      background: "#f0f0f0",
                      borderRadius: 8,
                      marginBottom: 12,
                      animation: "pulse 1.5s infinite",
                    }}
                  />
                  <div
                    style={{
                      width: "80%",
                      height: 24,
                      background: "#f0f0f0",
                      borderRadius: 4,
                      marginBottom: 8,
                      animation: "pulse 1.5s infinite",
                    }}
                  />
                  <div
                    style={{
                      width: "60%",
                      height: 16,
                      background: "#f0f0f0",
                      borderRadius: 4,
                      marginBottom: 8,
                      animation: "pulse 1.5s infinite",
                    }}
                  />
                  <div
                    style={{
                      width: "70%",
                      height: 16,
                      background: "#f0f0f0",
                      borderRadius: 4,
                      animation: "pulse 1.5s infinite",
                    }}
                  />
                </div>
              ))
            ) : movies.length === 0 ? (
              // Mensaje cuando no hay resultados
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                  padding: "32px",
                  color: "#666",
                  fontSize: "18px",
                }}
              >
                No se encontraron películas con ese término de búsqueda.
              </div>
            ) : (
              // Resultados de películas
              movies.map((movie) => (
                <div
                  key={movie.imdbID}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: 12,
                    padding: 16,
                    width: 220,
                    background: "#fff",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    cursor: "pointer",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    ":hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    },
                  }}
                  onClick={() => setSelectedMovie(movie)}
                >
                  <img
                    src={
                      movie.Poster !== "N/A"
                        ? movie.Poster
                        : "https://via.placeholder.com/200x300?text=No+Image"
                    }
                    alt={movie.Title}
                    style={{
                      width: "100%",
                      height: 300,
                      objectFit: "cover",
                      borderRadius: 8,
                      marginBottom: 12,
                    }}
                  />
                  <h3
                    style={{ color: "#34495e", fontSize: 18, marginBottom: 8 }}
                  >
                    {movie.Title}
                  </h3>
                  <p style={{ margin: 0 }}>
                    <b>Año:</b> {movie.Year}
                  </p>
                  <p style={{ margin: 0 }}>
                    <b>Director:</b> {movie.Director}
                  </p>
                </div>
              ))
            )}
          </div>
        </main>
        <AsideStats movies={movies} />
      </div>

      {selectedMovie && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={closeModal}
        >
          <div
            style={{
              background: "#fff",
              padding: 32,
              borderRadius: 16,
              maxWidth: 800,
              width: "90%",
              maxHeight: "90vh",
              overflow: "auto",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: "none",
                border: "none",
                fontSize: 24,
                cursor: "pointer",
                color: "#666",
              }}
              onClick={closeModal}
            >
              ×
            </button>
            <div style={{ display: "flex", gap: 24 }}>
              <img
                src={
                  selectedMovie.Poster !== "N/A"
                    ? selectedMovie.Poster
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={selectedMovie.Title}
                style={{
                  width: 300,
                  height: "auto",
                  borderRadius: 8,
                }}
              />
              <div>
                <h2
                  style={{ fontSize: 24, marginBottom: 16, color: "#2c3e50" }}
                >
                  {selectedMovie.Title}
                </h2>
                <div style={{ marginBottom: 24 }}>
                  <p style={{ margin: "8px 0" }}>
                    <b>Año:</b> {selectedMovie.Year}
                  </p>
                  <p style={{ margin: "8px 0" }}>
                    <b>Director:</b> {selectedMovie.Director}
                  </p>
                  <p style={{ margin: "8px 0" }}>
                    <b>Actores:</b> {selectedMovie.Actors}
                  </p>
                  <p style={{ margin: "8px 0" }}>
                    <b>Género:</b> {selectedMovie.Genre}
                  </p>
                  <p style={{ margin: "8px 0" }}>
                    <b>Duración:</b> {selectedMovie.Runtime}
                  </p>
                  <p style={{ margin: "8px 0" }}>
                    <b>Clasificación:</b> {selectedMovie.Rated}
                  </p>
                  <p style={{ margin: "8px 0" }}>
                    <b>País:</b> {selectedMovie.Country}
                  </p>
                  <p style={{ margin: "8px 0" }}>
                    <b>Idioma:</b> {selectedMovie.Language}
                  </p>
                  <p style={{ margin: "8px 0" }}>
                    <b>Premios:</b> {selectedMovie.Awards}
                  </p>
                  <p style={{ margin: "8px 0" }}>
                    <b>Calificación IMDB:</b> {selectedMovie.imdbRating}
                  </p>
                </div>
                <div>
                  <h3 style={{ color: "#2c3e50", marginBottom: 8 }}>Trama</h3>
                  <p style={{ lineHeight: 1.6 }}>{selectedMovie.Plot}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Estilos para la animación del skeleton */}
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}

export default App;
