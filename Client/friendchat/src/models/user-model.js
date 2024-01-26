import { action, computed, thunk } from "easy-peasy";
import UserService from "../services/userServices";

const userModel = {
  user: null,
  setUser: action((state, user) => {
    state.user = user;
  }),
  setUserStatus: action((state, status) => {
    state.user.status = status;
    UserService.updateUserStatus(status);
  }),

  allUsers: {},
  setAllUsers: action((state, payload) => {
    state.allUsers = {};
    for (let i = 0; i < payload.length; i++) {
      const user = payload[i];
      state.allUsers[user._id] = user;
    }
  }),
  usersList: computed((state) => {
    return Object.values(state.allUsers).filter(user => user.status !== "disconnected")
  }),
  updateUsers: action((state, updatedUser) => {
      state.allUsers[updatedUser._id] = updatedUser;
  }),
  getUser: computed(state => {
    return (id) => state.allUsers[id];
  }),

  allUsernames: [],
  setAllUsernames: action((state, usernames) => {
    state.allUsernames = usernames;
  }),
  fetchAllUsernames: thunk(async (actions) => {
    const response = await UserService.getAllUsernames();
    const { data } = response;
    actions.setAllUsernames(data);
  }),
};

export default userModel;
