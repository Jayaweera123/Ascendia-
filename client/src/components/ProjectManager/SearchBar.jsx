import React from "react";
import { IoSearch } from "react-icons/io5";

function SearchBar({ search, setSearch }) {
  return (
    <div>
      <div className="flex border border-gray-200 text-gray-400 bg-gray-50 items-center p-2 rounded-md">
        <IoSearch />
        <input
          className="bg-gray-50 outline-none ml-1 block flex-grow"
          type="text"
          name=""
          id=""
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
}

export default SearchBar;
