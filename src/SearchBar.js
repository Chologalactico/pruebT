import React, { useState } from "react";

function SearchBar({ onSearch, isLoading }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch(value.trim());
      setValue("");
      setError("");
    } else {
      setError("Por favor ingresa un nombre de película válido.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input
        type="text"
        placeholder="Buscar película..."
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          if (error) setError("");
        }}
        style={{ padding: 8, width: 250, marginRight: 8 }}
      />
      <button
        type="submit"
        style={{ padding: 8 }}
        className="btn btn-primary bg-[#C4C4C4] text-black font-weight-bold rounded-pill "
        disabled={isLoading}
      >
        {isLoading ? "Buscando..." : "Buscar"}
      </button>
      {isLoading && (
        <div style={{ marginTop: 10, color: "#2980b9", fontWeight: "bold" }}>
          Buscando la película...
        </div>
      )}
      {error && (
        <div style={{ marginTop: 10, color: "#e74c3c", fontWeight: "bold" }}>
          {error}
        </div>
      )}
    </form>
  );
}

export default SearchBar;
