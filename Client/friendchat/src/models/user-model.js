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

  logOut: false,
  setLogOut: action((state, { willLogOut }) => {
    state.logOut = willLogOut;
    console.log("user disconnected...");
    if (willLogOut) {
      UserService.disconnect();
      state.user = null;
    }
  }),

  allUsers: {},
  setAllUsers: action((state, payload) => {
    state.allUsers = {};
    for (let i = 0; i < payload.length; i++) {
      const user = payload[i];
      state.allUsers[user._id] = user;
    }
  }),
  usersList: computed((state) => Object.values(state.allUsers)),
  updateUsers: action((state, updatedUser) => {
    /*if (updatedUser.status === "disconnected") {
      state.allUsers = Object.keys(state.allUsers)
        .filter((key) => key != updatedUser._id)
        .reduce((newList, key) => {
          newList[key] = state.allUsers[key];
          return newList;
        });

    } else*/
      state.allUsers[updatedUser._id] = updatedUser;
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
