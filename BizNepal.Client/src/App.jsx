import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
import Header from "./Component/Header";
import "./App.css";
import Footer from "./Component/Footer";

function App() {
  // Dark mode
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.className = theme; // Ensure 'theme' is either 'light' or 'dark'
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    console.log(`Current theme: ${theme}`); // Debugging
    const newTheme = theme === "light" ? "dark" : "light";
    console.log(`New theme: ${newTheme}`); // Debugging
    setTheme(newTheme);
  };

  return (
    <>
      <Header toggleTheme={toggleTheme} currentTheme={theme} />
      <Outlet />
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
