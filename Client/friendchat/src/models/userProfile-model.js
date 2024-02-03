import { action, computed } from "easy-peasy";
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
    if (!state.userInterests[categoryId]) state.userInterests[categoryId] = [];

    const index = state.userInterests[categoryId].findIndex(i => i._id === interest._id);
    if (index !== -1)
      return;


    state.userInterests[categoryId].push(interest);
    
      
  }),

  removeUserInterest: action((state, { interest, categoryId }) => {
    if (!state.userInterests[categoryId]) return;

    const newUserInterests = state.userInterests[categoryId].filter(
      (i) => i._id !== interest._id
    );

    state.userInterests[categoryId] = newUserInterests;
  }),

  getUserInterests: computed((state) => {
    let interests = [];

    Object.values(state.userInterests).forEach((interestArr) => {
      interests = [...interests, ...interestArr];
    });

    return interests;
  }),
  updateProfile: action((state) => {
    const userId = state.user._id;
    let interests = [];

    Object.values(state.userInterests).forEach((interestArr) => {
      interestArr.forEach((i) => interests.push(i._id));
    });

    const profile = {
      description: state.description,
      imgUrl: state.profileImg,
      username: state.username,
      interests: interests,
    };

    try {
      UserService.updateUserProfile({ userId: userId, profile: profile });
      state.user.username = state.username;
      state.user.profile.imgUrl = state.profileImg;
      state.user.profile.description = state.description;
      state.user.profile.interests = state.userInterests;
    } catch (e) {
      console.log(e)
    }
  }),
};

export default userProfileModel;
