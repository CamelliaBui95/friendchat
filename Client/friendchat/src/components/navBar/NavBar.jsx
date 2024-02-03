import React from "react";
import "./navBar.css";
import { Link } from "react-router-dom";

const NavBar = ({ navItems }) => {

  const renderNavItem = (item) => {
    if (item.path)
      return (
        <Link
          to={item.path}
          className="no-underline text-slate-100 hover:text-white focus:text-white active:text-white transition-all duration-300"
        >
          {item.label}
        </Link>
      );

    if (item.func) {
      return (
        <button
          className=" text-slate-100 hover:text-white focus:text-white active:text-white transition-all duration-300"
          onClick={item.func}
        >
          {item.label}
        </button>
      );
    }

    return item.label;
  };

  return (
    <nav className="py-2 px-4 flex justify-between fixed top-0 left-0 right-0 z-[100]">
      <div>
        <Link
          to="/app"
          className="no-underline text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-100 hover:text-white"
        >
          FriendChat
        </Link>
      </div>
      <ul className="flex justify-center items-center gap-5 text-lg sm:text-xl md:text-2xl m-0 ">
        {navItems.map((item, index) => (
          <li key={index}>
           {renderNavItem(item)}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
