import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import HomeScreen from "./screen/HomeScreen";

function App() {
  return (
    <>
    <Outlet/>
    <ToastContainer/>
    </>
    
  )
}

export default App;
