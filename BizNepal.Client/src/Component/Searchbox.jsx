import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, ListGroup } from "react-bootstrap";
import { MDBIcon } from "mdb-react-ui-kit";
import "../Customcss/searchbox.css";

const Searchbox = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState("");
  const navigate = useNavigate();

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
      setSuggestions([]);
    }
  }, [query]);

  // Update query on input change
  const handleChange = (e) => {
    setQuery(e.target.value);
    setSelectedSuggestion(""); // Clear selected suggestion when typing
  };

  // Handle selecting a suggestion
  const handleSelectSuggestion = (suggestion) => {
    setSelectedSuggestion(suggestion); // Update selected suggestion
    setQuery(suggestion); // Update query to the selected suggestion
    setSuggestions([]); // Clear suggestions after selection
    handleSearch(suggestion); // Trigger search
  };

  // Trigger the search
  const handleSearch = (searchQuery = query) => {
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
      setQuery(""); // Clear query after search
      setSelectedSuggestion(""); // Clear selected suggestion after search
      setSuggestions([]); // Clear suggestions after search
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      handleSearch();
    }
  };

  return (
    <Form className="search-box d-flex align-items-center">
      <div className="input-group">
        {/* Input field */}
        <Form.Control
          type="text"
          value={selectedSuggestion || query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Search for a business..."
          className="form-control"
        />

        {/* Suggestions list */}
        {suggestions.length > 0 && (
          <ListGroup className="suggestion-dropdown">
            {suggestions.map((suggestion, index) => (
              <ListGroup.Item
                key={index}
                onClick={() => handleSelectSuggestion(suggestion)}
                style={{ cursor: "pointer" }}
              >
                {suggestion}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}

        {/* Search button */}
        <Button
          variant="danger"
          onClick={() => handleSearch()}
          className="btn-sm search-button d-flex justify-content-center align-items-center"
        >
          <MDBIcon icon="search" className="text-center" />
        </Button>
      </div>
    </Form>
  );
};

export default Searchbox;
