import { useState} from "react";
import axios from "axios";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userDetails = {
    userName: email,
    password,
  };


  const submithandler = (e) => {
    e.preventDefault();
  
    try {
      const response = axios.post("https://localhost:5000/api/Auth/login", userDetails);

      if (response && response.data) {

        const token = response.data.token;
        console.log(token);
        localStorage.setItem("token", token);
        
        setEmail("");
        setPassword("");
      }
      else{
        console.log({message: "Invalid credentials"});
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={submithandler}>
        UserName :{" "}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        Password:{" "}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Login"></input>
      </form>
    </div>
  );
};

export default Login;
