import React, {useState} from "react";
import "./tabs.css";

const Tabs = ({ onSelectTab, selectedTab, onSearch, searchValue }) => {
    const activeClass = "border-b-2 border-blue-900";

  return (
    <ul className="tab-container flex justify-start items-center h-[13%] w-full m-0 px-0 bg-white rounded-t-xl">
      <li className="p-2 cursor-pointer" onClick={() => onSelectTab("users")}>
        <i
          className={`fa-solid fa-user-group text-2xl ${
            selectedTab === "users" ? activeClass : ""
          }`}
          style={{ color: "#1d4072" }}
        ></i>
      </li>
      <li
        className="p-2 cursor-pointer"
        onClick={() => onSelectTab("messages")}
      >
        <i
          className={`fa-solid fa-comments text-2xl ${
            selectedTab === "messages" ? activeClass : ""
          }`}
          style={{ color: "#1d4072" }}
        ></i>
      </li>
      <li className="search-box-wrapper flex flex-grow-1 items-center gap-2 p-2">
        <i
          class="fa-solid fa-magnifying-glass text-2xl"
          style={{ color: "#1d4072" }}
        ></i>
        <input
          type="text"
          name=""
          id="search"
          value={searchValue}
          onChange={(e) => {
            e.preventDefault();
            onSearch(e.target.value);
          }}
        />
      </li>
    </ul>
  );
};

export default Tabs;
