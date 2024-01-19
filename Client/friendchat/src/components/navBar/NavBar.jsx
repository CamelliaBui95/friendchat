import React from "react";
import "./navBar.css";
import { Link } from "react-router-dom";

const NavBar = ({ navItems }) => {
  return (
    <nav className="py-3 px-4 flex justify-between">
      <div>
        <Link to="/login" className="no-underline text-2xl sm:text-3xl md:text-4xl font-semibold">
          FriendChat
        </Link>
      </div>
      <ul className="flex justify-center items-center gap-4 text-lg sm:text-xl md:text-2xl m-0">
        {navItems.map((item, index) => (
          <li key={index}>
            <Link to={item.path} className="no-underline">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
