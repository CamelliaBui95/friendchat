import { action, thunk, computed } from "easy-peasy";

const interestModel = {
  interestCategories: [],
  
  setCategories: action((state, categories) => {
    state.interestCategories = categories;
  })
};

export default interestModel;
