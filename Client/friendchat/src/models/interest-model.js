import { action, thunk, computed } from "easy-peasy";

const interestModel = {
  interestCategories: [],
  
  setCategories: action((state, categories) => {
    state.interestCategories = categories;
  }),

  getCategoryById: computed((state) => {
    return (categoryId) => state.interestCategories.find(i => i._id === categoryId);
  })
};

export default interestModel;
