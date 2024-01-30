import React from "react";
import "./interest.css";

const InterestTag = ({ label, toggle, modifiable, index, onClick }) => {
  return (
    <li
      className={`interest-tag ${!toggle && "tag-inactive"} ${
        modifiable && "tag-effect cursor-pointer"
      }`}
      key={index}
      onClick={onClick}
    >
      {label}
    </li>
  );
};

export default InterestTag;
