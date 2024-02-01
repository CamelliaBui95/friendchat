import React, { useState, useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import AppService from "../../../services/appServices";
import InterestTag from "./InterestTag";
import "./interest.css";

const ModifiableInterestCard = ({ category, index, userInterests }) => {
  const [allInterests, setAllInterests] = useState([]);
  const {userToken} = useStoreState(state => state);

  const { addUserInterest, removeUserInterest } = useStoreActions(
    (actions) => actions
  );

  const handleInterestClick = (interest) => {
    if (userHas(interest))
      removeUserInterest({ interest: interest, categoryId: interest.category });
    else addUserInterest({ interest: interest, categoryId: interest.category });
  };

  useEffect(() => {
    fetchAndSetAllInterests();
  }, []);

  const fetchAndSetAllInterests = async () => {
    try{
      const {data} = await AppService.fetchInterests(category._id, userToken);
      setAllInterests(data);
    } catch(e) {
      console.log(e);
      setAllInterests([]);
    }

  }

  const userHas = (interest) => {
    const index = userInterests.findIndex((i) => i._id === interest._id);
    return index !== -1;
  };

  return (
    <li
      key={"card-" + index}
      className="interest-card rounded-lg border-2 border-slate-200"
    >
      <h5 className="absolute bg-white -top-[15%] left-2 px-2 m-0">
        {category.label}
      </h5>
      <ul className="interest-tag-container flex flex-row flex-wrap gap-1">
        {allInterests.map((interest, index) => (
          <InterestTag
            label={interest.name}
            index={index}
            toggle={userHas(interest)}
            modifiable={true}
            onClick={() => handleInterestClick(interest)}
          />
        ))}
      </ul>
    </li>
  );
};

export default ModifiableInterestCard;

// <InterestTag
// label={interest.name}
// index={index}
// toggle={isActive(interest)}
// modifiable={modifiable}
// onClick={() => handleInterestClick(interest)}
// />
