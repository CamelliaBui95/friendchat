import { action, thunk } from "easy-peasy";
import UserService from "../services/userServices";
import Socket from "../services/socket";

const authModel = {
  authToken: null,
  userToken: null,
  authError: null,

  setAuthError: action((state, error) => {
    state.authError = error;
  }),

  setAuthToken: action((state, authToken) => {
    state.authToken = authToken;
    sessionStorage.setItem("authToken", authToken);
  }),

  setUserToken: action((state, userToken) => {
    state.userToken = userToken;
    sessionStorage.setItem("userToken", userToken);
    
  }),

  handleLogin: thunk(async (actions, payload, helpers) => {
    let { userData, userToken } = payload;

    if (!userToken) {
      try {
        const { data } = await UserService.getUserToken(userData);
        userToken = data;
      } catch (ex) {
        return ex.response.data;
      }
    }

    try {
      const response = await UserService.loginUser(userData, userToken);
      const authToken = response.headers["x-auth-token"];

      const user = response.data;

      actions.setAuthToken(authToken);
      actions.setUserToken(userToken);
      actions.setUser(user);

      Socket.pollSocket(authToken);
      actions.setAuthError(null);
    } catch (ex) {
      console.log(ex.response.data)
      actions.setAuthError(ex.response.data);
    }
  }),

  handleRegister: thunk(async (actions, userData, helpers) => {
    try {
      const { data } = await UserService.registerUser(userData);
      const userToken = data.token;
      actions.setUserToken(userToken);
      await actions.handleLogin({
        userData: { email: userData.email, password: userData.password },
        userToken,
      });
      actions.setAuthError(null);
    } catch (ex) {
      actions.setAuthError(ex.response.data);
    }
  }),

  handleLogOut: action((state) => {
    console.log("user has disconnected...");
    sessionStorage.clear();
    UserService.disconnect();
    state.user = null;
  }),

};

export default authModel;
