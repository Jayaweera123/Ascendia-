import React from "react";

const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="relative w-full max-w-xs">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
        <svg
          className="w-5 h-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.35-4.35M10 17a7 7 0 100-14 7 7 0 000 14z"
          />
        </svg>
      </div>
    </div>
  );
};

export default SearchBar;
