import React, { useState } from "react";
import "./interest.css";
import { useStoreState } from "easy-peasy";

const InterestCategoriesDropdown = ({ onCategoryClick, selectedCategories }) => {
  const { interestCategories } = useStoreState((state) => state);
  const [toggleCategory, setToggleCategory] = useState(false);

  const handleToggleCategory = () => {
    setToggleCategory(!toggleCategory);
  };

  const isSelected = (category) => {
     if (selectedCategories.length === 0) return false;

     const index = selectedCategories.findIndex((c) => c._id === category._id);

     return index !== -1;
  }

  return (
    <div className="category-dropdown w-[20%]">
      <button
        className="dropdown-btn category-dropdown-btn rounded-lg text-xl"
        onClick={handleToggleCategory}
      >
        Add a category
      </button>
      <ul
        className="category-dropdown-content rounded-lg z-1"
        hidden={!toggleCategory}
      >
        {interestCategories.map((category, index) => (
          <li
            key={"cd-" + index}
            className={`category ${isSelected(category) && "category-active"}`}
            onClick={(e) => {
              e.preventDefault();
              handleToggleCategory();
              onCategoryClick(category);
            }}
          >
            {category.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InterestCategoriesDropdown;
