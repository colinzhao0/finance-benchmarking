import React, { useState, useRef, useEffect } from 'react';
import { TICKERS } from '../data/mockData';
import './SearchBar.css';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = TICKERS.filter(ticker =>
        ticker.symbol.toLowerCase().includes(query.toLowerCase()) ||
        ticker.name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.toUpperCase());
      setQuery('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (symbol) => {
    setQuery('');
    setShowSuggestions(false);
    onSearch(symbol);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[selectedIndex].symbol);
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search stocks (e.g., AAPL, Apple)"
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((ticker, index) => (
            <div
              key={ticker.symbol}
              className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
              onClick={() => handleSuggestionClick(ticker.symbol)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <span className="suggestion-symbol">{ticker.symbol}</span>
              <span className="suggestion-name">{ticker.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
