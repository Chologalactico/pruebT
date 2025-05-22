import React, { useState } from "react";

function AsideStats({ movies }) {
  const [showStats, setShowStats] = useState(true);

  // Contar películas por año
  const countByYear = movies.reduce((acc, movie) => {
    acc[movie.Year] = (acc[movie.Year] || 0) + 1;
    return acc;
  }, {});

  // Contar películas por director
  const countByDirector = movies.reduce((acc, movie) => {
    if (movie.Director && movie.Director !== "N/A") {
      movie.Director.split(",").forEach((dir) => {
        const director = dir.trim();
        acc[director] = (acc[director] || 0) + 1;
      });
    }
    return acc;
  }, {});

  if (!showStats) {
    // Solo mostrar el botón centrado cuando las estadísticas están ocultas
    return (
      <aside
        style={{
          marginLeft: 40,
          minWidth: 250,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <button
          onClick={() => setShowStats(true)}
          style={{
            padding: "12px 24px",
            background: "#2980b9",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: 16,
          }}
        >
          Mostrar estadísticas
        </button>
      </aside>
    );
  }

  // Mostrar estadísticas y el botón de ocultar arriba a la derecha
  return (
    <aside
      style={{
        marginLeft: 40,
        minWidth: 250,
        background: "#f8f9fa",
        borderRadius: 12,
        padding: 24,
        boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
        position: "relative",
      }}
    >
      <button
        onClick={() => setShowStats(false)}
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          padding: "4px 12px",
          background: "#e74c3c",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          fontWeight: "bold",
          cursor: "pointer",
          fontSize: 14,
        }}
      >
        ✕
      </button>
      <h2
        style={{
          color: "#2c3e50",
          borderBottom: "1px solid #ddd",
          paddingBottom: 8,
          marginBottom: 20,
        }}
      >
        Estadísticas
      </h2>
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ color: "#2980b9", marginBottom: 10 }}>
          Películas por año
        </h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {Object.entries(countByYear).map(([year, count]) => (
            <li key={year} style={{ marginBottom: 6 }}>
              <span style={{ fontWeight: "bold" }}>{year}:</span> {count}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 style={{ color: "#27ae60", marginBottom: 10 }}>
          Películas por director
        </h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {Object.entries(countByDirector).map(([director, count]) => (
            <li key={director} style={{ marginBottom: 6 }}>
              <span style={{ fontWeight: "bold" }}>{director}:</span> {count}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default AsideStats;
