import React from "react";
import "./interest.css";

const InterestCard = ({ index, category, interests, userInterests }) => {
  return (
    <li
      key={index}
      className="interest-card rounded-lg border-2 border-slate-200"
    >
      <h5 className="absolute bg-white -top-[15%] left-2 px-2 m-0">
        {category}
      </h5>
      <ul className="interest-tag-container flex flex-row flex-wrap gap-1">
        {interests.map((interest, index) => (
          <li className={`interest-tag ${!userInterests.includes(interest) && "tag-inactive"} cursor-pointer tag-effect`} key={index}>{interest.name}</li>
        ))}
      </ul>
    </li>
  );
};

export default InterestCard;
