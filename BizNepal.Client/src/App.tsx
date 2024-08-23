import { useState, useEffect } from "react";
import "./App.css";

interface tempData {
  date: string;
  temperatureC: number;
  summary: string;
}

function App() {
  const [data, setData] = useState<tempData[] | null>(null); // Updated to expect an array of tempData
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Call the .NET API on component mount
  useEffect(() => {
    const apiUrl = "https://localhost:5000/weatherforecast"; // Full API URL

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("API call failed");
        }
        const result: tempData[] = await response.json(); // Ensure the response is typed correctly
        setData(result); // Set the data from the API
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array to ensure the API call runs only on component mount

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="App">
      <h1>Weather Forecast</h1>
      {data && data.length > 0 ? (
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              <p>Date: {item.date}</p>
              <p>Temperature (C): {item.temperatureC}</p>
              <p>Summary: {item.summary}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default App;
