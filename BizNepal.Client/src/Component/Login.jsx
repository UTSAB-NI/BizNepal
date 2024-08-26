import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userDetails = {
    userName: email,
    password,
  };

  const submithandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://localhost:5000/api/Auth/login",
        userDetails
      );
      // console.log(response.data)
      if (response && response.data) {
        const token = response.data.jwtToken;
        console.log(token);
        localStorage.setItem("token", token);
        setEmail("");
        setPassword("");
      } else {
        console.log({ message: "Invalid credentials" });
        toast.error("Invalid credentials");
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("Error:", error);
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
