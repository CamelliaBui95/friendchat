import { action, thunk } from "easy-peasy";
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
    console.log("user disconnected...");
    if (willLogOut) {
      UserService.disconnect();
      state.user = null;
    }
  }),

  allUsers: [],
  setAllUsers: action((state, payload) => {
    state.allUsers = payload;
  }),
  allUsernames: [],
  setAllUsernames: action((state, usernames) => {
    state.allUsernames = usernames;
  }),
  fetchAllUsernames: thunk(async (actions) => {
    const response = await UserService.getAllUsernames();
    const { data } = response;
    actions.setAllUsernames(data);
  })
};

export default userModel;
