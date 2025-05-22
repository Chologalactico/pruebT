import React from "react";

function AsideStats({ movies }) {
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

  return (
    <aside style={{ marginLeft: 40, minWidth: 220 }}>
      <h2>Estadísticas</h2>
      <div>
        <h3>Películas por año</h3>
        <ul>
          {Object.entries(countByYear).map(([year, count]) => (
            <li key={year}>{year}: {count}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Películas por director</h3>
        <ul>
          {Object.entries(countByDirector).map(([director, count]) => (
            <li key={director}>{director}: {count}</li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default AsideStats;