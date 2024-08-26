import React, { useState } from 'react';
import axios from 'axios';
import {toast}  from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const userDetails = {
    userName:email,
    password
  }
  const submithandler = async (e: React.FormEvent) => {
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
        navigate("/")
        toast.success("Login Successful !!")
      } else {
        console.log({ message: "Invalid credentials" });
        toast.error("Invalid credentials");
      }
    } catch (error) {
      // console.log("Error:", error);
      toast.error(`Error: ${error}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={submithandler} className="space-y-4">
          <div>
            <label className="block text-gray-700">UserName:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <input
              type="submit"
              value="Login"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;