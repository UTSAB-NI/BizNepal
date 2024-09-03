import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

import HomeScreen from "./screen/HomeScreen";
import Header from "./Component/Header";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <ToastContainer />
    </>
  );
}

export default App;
