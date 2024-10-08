import React from "react";
import SearchBar from "./SearchBar";

const Navbar = ({ handleSearch, toggleModal }) => {
  return (
    <div className="flex justify-between items-center px-5 border-b border-500">
      <h4 className="text-2xl">E Books</h4>
      <div className="w-[500px]">
        <SearchBar onSearch={handleSearch} />
      </div>
      <button onClick={toggleModal} className="bg-blue-500 text-white px-2 py-1 rounded-lg ">
        Add Book
      </button>
    </div>
  );
};

export default Navbar;
