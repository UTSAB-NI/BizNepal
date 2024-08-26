import { Link } from "react-router-dom";
import "../Customcss/header.css"
const Header = () => {
  return (
    <nav className=" p-4 border  shadow shadow-slate-100">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-black text-lg font-bold">
          <Link to="/">
            <span className="text-blue-800 text-3xl">biz</span>
            <span className="text-red-700 text-3xl">n<img src="images/nepal-icon.png" style={{display:"inline", width:30}}/>pal</span>
            
          </Link>
        </div>
        <ul className="flex space-x-4">
          <li className="nav-item">
            <Link
              to="/login"
              className=" btn-login hover:text-gray-400 login-list p-2 text-white"
            >
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/businesslist"
              className="btn-business hover:text-gray-400 business-list  p-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              + List your business
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
