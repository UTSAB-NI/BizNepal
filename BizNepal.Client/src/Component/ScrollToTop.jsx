import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Resets the scroll position to the top
  }, [pathname]);

  return null;
};

export default ScrollToTop;
