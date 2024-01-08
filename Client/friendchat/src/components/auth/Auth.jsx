import "./auth.css";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useState, useEffect } from "react";
import Login from "../login/login";
import Register from "../register/Register";
import UserService from "../../services/userServices";
import Socket from "../../services/socket";
import Joi from "joi";

const Auth = () => {
  const { user, logOut } = useStoreState((state) => state);
  const { setUser, setLogOut } = useStoreActions((actions) => actions);
  const [userData, setUserData] = useState();
  const [allUsernames, setAllUsernames] = useState();
  const [tokens, setTokens] = useState({});
  const [willLogIn, setWillLogIn] = useState(false);

  const validate = (userData, schema) => {
    const joiSchema = Joi.object(schema);
    const data = { ...userData };
    const errors = {};
    const options = { abortEarly: false };

    const { error } = joiSchema.validate(data, options);
    if (!error) return null;

    error.details.map((err) => (errors[err.path[0]] = err.message));

    return errors;
  };

  const validateProperty = ({ name, value }, schema) => {
    const propertySchema = Joi.object({ [name]: schema[name] });
    const propertyData = { [name]: value };

    const { error } = propertySchema.validate(propertyData);

    return error ? error.details[0].message : null;
  };

  const handleLogin = async (userData, registerToken) => {
    if (!registerToken) {
      try {
        const { data: userToken } = await UserService.getUserToken(userData);
        registerToken = userToken;
      } catch (ex) {
        console.log(ex.response.data);
        return ex.response.data;
      }
    }

    try {
      const response = await UserService.loginUser(userData, registerToken);
      const authToken = response.headers["x-auth-token"];

      sessionStorage.setItem("authToken", authToken);
      sessionStorage.setItem("registerToken", registerToken);

      const user = response.data;

      setTokens({
        ...tokens,
        authToken: authToken,
        registerToken: registerToken,
      });
      setUserData(user);
      setLogOut({willLogOut: false});
      setWillLogIn(true);

      Socket.pollSocket(authToken);
      return null;
    } catch (ex) {
      console.log(ex.response.data);
      return ex.response.data;
    }
  };

  const handleRegister = async (userData) => {
    try {
      const { data: registerToken } = await UserService.registerUser(userData);
      handleLogin(
        { email: userData.email, password: userData.password },
        registerToken
      );
      return null;
    } catch (ex) {
      console.log(ex.response.data);
      return { email: ex.response.data };
    }
  };

  const handleLoginWithAuth = (userData) => {
    setUser(userData);
    setLogOut({ willLogOut: false });

    UserService.connectUser(userData);
  };

  useEffect(() => {
    const storedTokens = { ...tokens };

    const registerToken = sessionStorage.getItem("registerToken");
    if (registerToken) storedTokens.registerToken = registerToken;

    const authToken = sessionStorage.getItem("authToken");
    if (authToken && !logOut) {
      storedTokens.authToken = authToken;
      Socket.pollSocket(authToken);
      UserService.connectUser(user);
    }

    setTokens(storedTokens);
  }, []);

  useEffect(() => {
    //  if(serverError.message)
    //   alert(serverError.message);
    const fetchAllUsernames = async () => {
      const response = await UserService.getAllUsernames();
      const { data } = response;
      setAllUsernames(data);
    };

    fetchAllUsernames();
  }, []);

  if (!tokens.registerToken && !willLogIn)
    return (
      <Register
        validate={validate}
        validateProperty={validateProperty}
        onRegister={handleRegister}
        allUsernames={allUsernames}
        onLogin={() => setWillLogIn(true)}
      />
    );

  return (
    <Login
      validate={validate}
      validateProperty={validateProperty}
      onLogin={userData && tokens.authToken ? handleLoginWithAuth : handleLogin}
      user={userData}
      registerToken={tokens.registerToken}
      onRegister={() => setWillLogIn(false)}
    />
  );
};

export default Auth;
