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
  }),

  setUserToken: action((state, userToken) => {
    state.userToken = userToken;
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

      sessionStorage.setItem("authToken", authToken);
      sessionStorage.setItem("userToken", userToken);

      const user = response.data;

      actions.setAuthToken(authToken);
      actions.setUserToken(userToken);
      actions.setUser(user);

      Socket.pollSocket(authToken);
      actions.setAuthError(null);
    } catch (ex) {
      actions.setAuthError(ex.response.data);
    }
  }),

  handleRegister: thunk(async (actions, userData, helpers) => {
    try {
      const { data: userToken } = await UserService.registerUser(userData);
      await actions.handleLogin({
        userData: { email: userData.email, password: userData.password },
        userToken,
      });
      actions.setAuthError(null);
    } catch (ex) {
      actions.setAuthError(ex.response.data);
    }
  }),

  handleLoginWithAuth: thunk(async (actions, userData) => {
    actions.setUser(userData);
    try {
      UserService.connectUser(userData);
    } catch (error) {
      actions.setAuthError(error);
    }
  }),
};

export default authModel;
