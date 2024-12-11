import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-white bg-opacity-50 shadow-lg backdrop-filter backdrop-blur-lg">
      <div className="max-w-6xl mx-auto px-4">
        <ul className="flex justify-center space-x-8 py-4">
          <li>
            <Link
              to="/home"
              className="text-gray-800 font-semibold text-lg transition duration-300 ease-in-out hover:underline hover:text-blue-600"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/product"
              className="text-gray-800 font-semibold text-lg transition duration-300 ease-in-out hover:underline hover:text-blue-600"
            >
              Solutions
            </Link>
          </li>
          <li>
            <Link
              to="/analysis"
              className="text-gray-800 font-semibold text-lg transition duration-300 ease-in-out hover:underline hover:text-blue-600"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/data"
              className="text-gray-800 font-semibold text-lg transition duration-300 ease-in-out hover:underline hover:text-blue-600"
            >
              Data
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
