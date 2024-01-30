import { action, computed, thunk } from "easy-peasy";
import UserService from "../services/userServices";

const userProfileModel = {
  username: "",
  description: "",
  userInterests: {},
  profileImg: "",

  setUsername: action((state, username) => {
    state.username = username;
  }),

  setDescription: action((state, description) => {
    state.description = description;
  }),

  setProfileImg: action((state, imgUrl) => {
    state.profileImg = imgUrl;
  }),

  setUserInterests: action((state, { interests, categoryId }) => {
    state.userInterests[categoryId] = interests;
  }),

    addUserInterest: action((state, { interest, categoryId }) => {
      
    if (state.userInterests[categoryId] === null)
      state.userInterests[categoryId] = [];

    state.userInterests[categoryId].push(interest);
  }),

  getUserInterests: computed((state) => {
    let interests = [];

    Object.values(state.userInterests).forEach((interestArr) => {
      interests = [...interests, ...interestArr];
    });

    return interests;
  }),
};

export default userProfileModel;
