import React, { useState, useEffect } from "react";
import "./interest.css";
import InterestTag from "./InterestTag";

const InterestCard = ({ index, category, userInterests }) => {
  return (
    <li
      key={"card-" + index}
      className="interest-card rounded-lg border-2 border-slate-200"
    >
      <h5 className="absolute bg-white -top-[15%] left-2 px-2 m-0">
        {category.label}
      </h5>
      <ul className="interest-tag-container flex flex-row flex-wrap gap-1">
        {userInterests.map((i, index) => (
          <InterestTag
            label={i.name}
            index={index}
            toggle={true}
            modifiable={false}
            onClick={() => {}}
          />
        ))}
      </ul>
    </li>
  );
};

export default InterestCard;

//<li className={`interest-tag ${!userInterests.includes(interest) && "tag-inactive"} cursor-pointer tag-effect`} key={index}>{interest.name}</li>
