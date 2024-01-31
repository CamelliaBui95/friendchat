import React, { useState, useEffect } from "react";
import "./interest.css";
import InterestTag from "./InterestTag";
import { useStoreActions, useStoreState } from "easy-peasy";

const InterestCard = ({
  index,
  category,
  interests,
  userInterests,
  modifiable,
}) => {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const { addUserInterest, removeUserInterest } = useStoreActions((actions) => actions);

  const handleInterestClick = interest => {
    if(userInterests.includes(interest))
      removeUserInterest({interest: interest, categoryId: interest.category});
    else
      addUserInterest({interest: interest, categoryId: interest.category});
  }

  useEffect(() => {
    setSelectedInterests(userInterests);
  }, [userInterests]);

  return (
    <li
      key={index}
      className="interest-card rounded-lg border-2 border-slate-200"
    >
      <h5 className="absolute bg-white -top-[15%] left-2 px-2 m-0">
        {category.label}
      </h5>
      <ul className="interest-tag-container flex flex-row flex-wrap gap-1">
        {modifiable &&
          interests.map((interest, index) => (
            <InterestTag
              label={interest.name}
              index={index}
              toggle={selectedInterests.includes(interest)}
              modifiable={modifiable}
              onClick={() => handleInterestClick(interest)}
            />
          ))}
        {!modifiable &&
          userInterests
            .filter((i) => i.category === category._id)
            .map((i, index) => (
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
