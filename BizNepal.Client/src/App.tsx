import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Call the .NET API on component mount
  useEffect(() => {
    // Replace 'weatherforecast' with your actual API endpoint
    const apiUrl = "https://localhost:5000/weatherforecast"; // Full API URL

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("API call failed");
        }
        const result = await response.json();
        setData(result); // Set the data from the API
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array to ensure the API call runs only on component mount

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && (
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              {item.date} - {item.temperatureC}°C - {item.summary}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
