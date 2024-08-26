import { Link } from "react-router-dom";
const Header = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link to="/">BIZNEPAL</Link>
        </div>
        <ul className="flex space-x-4">
          <li className="nav-item">
            <Link to="/home" className="text-white hover:text-gray-400">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="text-white hover:text-gray-400">About</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="text-white hover:text-gray-400">Contact</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="text-white hover:text-gray-400">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;