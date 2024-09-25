import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchWithSuggestions = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const inputRef = useRef(null); // Reference for the input field

  // Fetch suggestions from API
  useEffect(() => {
    if (query.length > 1) {
      const fetchSuggestions = async () => {
        try {
          const response = await axios.get(
            `https://localhost:5000/api/Business/suggestions?query=${query}`
          );
          setSuggestions(response.data);
        } catch (error) {
          console.error("Error fetching suggestions", error);
        }
      };
      fetchSuggestions();
    } else {
      setSuggestions([]); // Reset suggestions when query is short
    }
  }, [query]);

  // Update query on input change
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  // Handle selecting a suggestion
  const handleSelectSuggestion = (suggestion) => {
    setQuery(suggestion); // Update query with selected suggestion
    setSuggestions([]); // Immediately clear the suggestions
    inputRef.current.blur(); // Remove focus from the input field to trigger re-render
  };

  // Trigger the search
  const handleSearch = () => {
    if (query.trim()) {
      setSuggestions([]); // Ensure the suggestion list is cleared
      navigate(`/search/${query}`);
    }
  };

  return (
    <div>
      <input
        ref={inputRef} // Attach the ref to the input field
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for a business..."
      />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSelectSuggestion(suggestion)}
              style={{ cursor: "pointer" }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchWithSuggestions;
