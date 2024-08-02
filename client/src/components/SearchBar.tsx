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
    <div className="flex items-center bg-gray-100 rounded-2xl pr-3 w-1/2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search your files..."
        className="w-full bg-transparent border-none rounded-2xl m-1 p-2 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button
        onClick={handleSearch}
        className="text-gray-500 hover:text-gray-700 transition duration-300 bg-primary rounded-2xl p-1"
      >
        <FiSearch size={20} color='white' />
      </button>
    </div>
  );
};

export default SearchBar;
