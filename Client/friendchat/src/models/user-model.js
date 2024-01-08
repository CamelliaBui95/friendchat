import { action } from "easy-peasy";
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

  logOut: false,
  setLogOut: action((state, { willLogOut }) => {
    state.logOut = willLogOut;
    if (willLogOut) {
      UserService.disconnect();
      state.user = null;
    }
  }),

  allUsers: [],
  setAllUsers: action((state, payload) => {
    state.allUsers = payload;
  }),
};

export default userModel;
