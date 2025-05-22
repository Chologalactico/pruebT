import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch(value.trim());
      setValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input
        type="text"
        placeholder="Buscar película..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ padding: 8, width: 250, marginRight: 8 }}
      />
      <button type="submit" style={{ padding: 8 }}>Buscar</button>
    </form>
  );
}

export default SearchBar;