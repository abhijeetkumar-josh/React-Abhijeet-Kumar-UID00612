import React, { useState } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className="search-container" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search GitHub Users..."
        className="search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="primary--button">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
