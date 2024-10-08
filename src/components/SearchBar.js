import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="p-2 flex justify-center w-50">
      <input
        type="text"
        placeholder="Search books..."
        value={query}
        onChange={handleInputChange}
        className="border border-gray-300 rounded-lg p-2 w-full max-w-md outline-none"
      />
    </div>
  );
};

export default SearchBar;
