import React, { useState, useEffect, useRef } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import "./interest.css";
import InterestCard from "./InterestCard";
import InterestCategoriesDropdown from "./InterestCategoriesDropdown";
import AppService from "../../../services/appServices";
import ModifiableInterestCard from "./ModifiableInterestCard";

const InterestSection = ({ modifiable }) => {
  const boxRef = useRef(null);
  const { interestCategories, userInterests } = useStoreState((state) => state);
  const { setCategories } = useStoreActions((actions) => actions);
  const getCategoryById = useStoreState((state) => state.getCategoryById);
  const [currentCategories, setCurrentCategories] = useState([]);

  const handleCategoryClick = (category) => {
    if (!hasCategory(category._id))
      setCurrentCategories([...currentCategories, category]);
  };

  useEffect(() => {
    if (interestCategories.length === 0)
      AppService.getInterestCategories(setCategories);
  }, []);

  useEffect(() => {
    Object.keys(userInterests).map((categoryId) => {
      if (!hasCategory(categoryId)) {
        const category = getCategoryById(categoryId);
        setCurrentCategories([...currentCategories, category]);
      }
    });
  }, [userInterests, modifiable]);

  const hasCategory = (categoryId) => {
    if (currentCategories.length === 0) return false;

    const index = currentCategories.findIndex((c) => c._id === categoryId);

    return index !== -1;
  };

  return (
    <div className="row-span-5 flex flex-col justify-items-center gap-2">
      {modifiable && (
        <InterestCategoriesDropdown
          onCategoryClick={handleCategoryClick}
          selectedCategories={currentCategories}
        />
      )}
      <ul
        ref={boxRef}
        className="interest-card-container flex-grow-1 p-2 border border-slate-200 shadow-inner rounded-lg overflow-y-auto"
      >
        {modifiable &&
          currentCategories.map((category, index) => (
            <ModifiableInterestCard
              index={index}
              category={category}
              userInterests={
                userInterests[category._id] ? userInterests[category._id] : []
              }
            />
          ))}
        {!modifiable &&
          Object.entries(userInterests).map(
            ([categoryId, interests], index) => {
              if (interests.length === 0) return;

              return (
                <InterestCard
                  index={index}
                  category={getCategoryById(categoryId)}
                  userInterests={interests}
                />
              );
            }
          )}
      </ul>
    </div>
  );
};

export default InterestSection;
