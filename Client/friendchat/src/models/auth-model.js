import { action, thunk, computed } from "easy-peasy";
import UserService from "../../services/userServices";
import Socket from "../../services/socket";
import Joi from "joi";

const auth = {
  authToken: "",
  userToken: "",
  validate: action((state, payload) => {
    const { userData, schema } = payload;
    const joiSchema = Joi.object(schema);
    const data = { ...userData };
    const errors = {};
    const options = { abortEarly: false };

    const { error } = joiSchema.validate(data, options);
    if (!error) return null;

    error.details.map((err) => (errors[err.path[0]] = err.message));

    return errors;
  }),

  validateProperty: action((state, payload) => {
    const { input, schema } = payload;
    const { name, value } = input;

    const propertySchema = Joi.object({ [name]: schema[name] });
    const propertyData = { [name]: value };

    const { error } = propertySchema.validate(propertyData);

    return error ? error.details[0].message : null;
  }),

  handleLogin: thunk(async (actions, payload, helpers) => {
    const {userData, userToken} = payload;

    if(!userToken) {
        try {
            const { data } = await UserService.getUserToken(userData);
            userToken = data;
        } catch (ex) {
            return ex.response.data;
        }
    };

    try {
        const response = await UserService.loginUser(userData, registerToken);
        const authToken = response.headers["x-auth-token"];
  
        sessionStorage.setItem("authToken", authToken);
        sessionStorage.setItem("userToken", userToken);
  
        const user = response.data;
        
        helpers.getState().authToken = authToken;
        helpers.getState().userToken = userToken;
        actions.setUser(user);
  
        Socket.pollSocket(authToken);
        return null;
      } catch (ex) {
        return ex.response.data;
      }
  }),

  handleRegister: thunk(async (actions, userData, helpers) => {
    try {
        const { data: userToken } = await UserService.registerUser(userData);
        actions.handleLogin(
          { email: userData.email, password: userData.password },
          userToken
        );
        return null;
      } catch (ex) {
        return { email: ex.response.data };
      }
  }),

  handlerLoginWithAuth: thunk(async (actions, userData) => {
    actions.setUser(userData);
    UserService.connectUser(userData);
  })
};
