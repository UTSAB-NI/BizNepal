import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { FaArrowUp } from "react-icons/fa";
// import 'react-toastify/dist/ReactToastify.css';
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import ScrollToTop from "./Component/ScrollToTop"; // Import the ScrollToTop component
import "./App.css";

function App() {
  // Back-to-top button visibility
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <ScrollToTop /> {/* Add this component to ensure scroll reset */}
      <Header />
      <Outlet />
      {/* Back-to-top button */}
      {showScrollButton && (
        <button
          className="dbtn btn-primary back-to-top btn-floating btn btn-danger"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ position: "fixed", bottom: "20px", right: "20px" }}
        >
          <FaArrowUp />
        </button>
      )}
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
