import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, ListGroup } from "react-bootstrap";
import { MDBIcon } from "mdb-react-ui-kit";
import "../Customcss/searchbox.css";

const Searchbox = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
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
  };

  // Handle selecting a suggestion
  // const handleSelectSuggestion = (suggestion) => {
  //   setQuery(suggestion); // Update query to the selected suggestion
  //   setSuggestions([]); // Clear suggestions after selection
  // };

  // Trigger the search
  const handleSearch = (suggestion) => {
    setQuery(suggestion); // Update query to the selected suggestion
    setSuggestions([]); // Clear suggestions after selection
    if (query.trim()) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <Form className="search-box" onSubmit={handleSearch}>
      <Form.Control
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for a business..."
        className=""
      />

      {/* Suggestions list */}
      {suggestions.length > 0 && (
        <ListGroup className="mb-3">
          {suggestions.map((suggestion, index) => (
            <ListGroup.Item
              key={index}
              onClick={() => handleSearch(suggestion)}
              style={{ cursor: "pointer" }}
            >
              {suggestion}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      {/* Search button */}
      <Button variant="warning" onClick={handleSearch} className="mx-2 btn-sm ">
        <MDBIcon icon="search" className="ms-2" className="text-center" />
      </Button>
    </Form>
  );
};

export default Searchbox;
