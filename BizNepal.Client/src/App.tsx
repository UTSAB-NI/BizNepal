import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./Component/Login";
function App() {
  const [message, setMessage] = useState("");
  

  useEffect(() => {
    // const response = axios .get("https://localhost:5000/api/Home/test");

    //   try {
    //     response ? setMessage(response.data) : setFeedback("Response Error")
    //   } catch (error) {
    //     setFeedback(`Error fetching data${error}`);
    //   }
    axios 
      .get("https://localhost:5000/api/Home/test")
      .then((response) => {
        setMessage(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);


  return (
    <div>
      <h1>Ping Response:</h1>
      <p>{message}</p>
      <Login />
    </div>
  );
}

export default App;
