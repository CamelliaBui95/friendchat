import React, { useState, useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import "./interest.css";
import InterestCard from "./InterestCard";
import InterestCategoriesDropdown from "./InterestCategoriesDropdown";
import AppService from "../../../services/appServices";

const InterestSection = ({ modifiable }) => {
  const { interestCategories, userInterests } = useStoreState((state) => state);
  const { setCategories } = useStoreActions((actions) => actions);
  const [interestsByCategory, setInterestsByCategory] = useState([]);
  const getCategoryById = useStoreState((state) => state.getCategoryById);
  const [interestMap, setInterestMap] = useState({});
  const [currentCategory, setCurrentCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setCurrentCategory(category);
    AppService.getInterestsByCategory(setInterestsByCategory, category._id);
  };

  useEffect(() => {
    if (interestCategories.length === 0)
      AppService.getInterestCategories(setCategories);

  }, []);

  useEffect(() => {
    if (currentCategory) {
      const newInterestMap = { ...interestMap };
      newInterestMap[currentCategory._id] = interestsByCategory;
      setInterestMap(newInterestMap);
    }
  }, [interestsByCategory]);

  useEffect(() => {
    setInterestMap(userInterests);
  }, [modifiable, userInterests])

  return (
    <div className="row-span-5 flex flex-col justify-items-center gap-2">
      {modifiable && (
        <InterestCategoriesDropdown onCategoryClick={handleCategoryClick} />
      )}
      <ul className="interest-card-container flex-grow-1 p-2 border border-slate-200 shadow-inner rounded-lg overflow-y-auto">
        {Object.keys(interestMap).map((key, index) => {
          return (
            <InterestCard
              index={index}
              category={getCategoryById(key)}
              interests={interestMap[key]}
              userInterests={userInterests[key] ? userInterests[key] : []}
              modifiable={modifiable}
            />
          );
        }
          
        )}
      </ul>
    </div>
  );
};

export default InterestSection;
