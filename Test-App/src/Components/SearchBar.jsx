import React from 'react';
import { Search } from 'lucide-react'; // Optional: Use Lucide for icons or raw SVG

const SearchBar = ({savepoint}) => {
  return (
      <div className="flex items-center w-full px-2 py-1 bg-[#FCFCFC] border border-[#EAEAEA] rounded">
        {/* Search Icon */}
        <svg 
          className="w-5 h-5 text-gray-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>

        {/* Input Field */}
        <input
          type="text"
          placeholder="Search a driver"
          className="w-full ml-3 text-gray-700 placeholder-gray-300 bg-[#FCFCFC] outline-none"
          onChange={(e)=> savepoint(e.target.value)}
        />
      </div>
  );
};



export default SearchBar;