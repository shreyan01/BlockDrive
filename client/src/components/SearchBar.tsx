// components/SearchBar.tsx
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = () => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    // Handle the search logic here
    console.log('Searching for:', query);
  };

  return (
    <div className="flex items-center bg-gray-100 rounded-xl pr-3 w-80">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="w-full bg-transparent border-none rounded-xl m-2 p-2 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button
        onClick={handleSearch}
        className="text-gray-500 hover:text-gray-700 transition duration-300 bg-primary rounded-xl p-2"
      >
        <FiSearch size={24} color='white' />
      </button>
    </div>
  );
};

export default SearchBar;
