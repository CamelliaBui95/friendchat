import './auth.css';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useState, useEffect } from 'react';
import Login from '../login/login';
import Register from '../register/Register';
import UserService from '../../services/userServices';
import Socket from "../../services/socket";
import Joi from 'joi';

const Auth = () => {
    const { user } = useStoreState(state => state);
    const { setUser } = useStoreActions(actions => actions);
    const [userData, setUserData] = useState();
    const [tokens, setTokens] = useState({});
    const [serverError, setServerError] = useState({});

    const validate = (userData, schema) => {
        const joiSchema = Joi.object(schema);
        const data = { ...userData };
        const errors = {};
        const options = { abortEarly: false };

        const { error } = joiSchema.validate(data, options);
        if (!error) return null;

        error.details.map(err => errors[err.path[0]] = err.message);
        
        return errors;
    }

    const validateProperty = ({ name, value }, schema) => {
        const propertySchema = Joi.object({ [name]: schema[name] });
        const propertyData = { [name]: value };

        const { error } = propertySchema.validate(propertyData);
        
        return error ? error.details[0].message : null;
    }

    const handleLogin = async (userData, registerToken) => {
        try {
            const response = await UserService.loginUser(userData, registerToken);
            const authToken = response.headers["x-auth-token"];

            sessionStorage.setItem("authToken", authToken);
            sessionStorage.setItem("registerToken", registerToken);

            const user = response.data;
            
            setTokens({ ...tokens, authToken: authToken, registerToken: registerToken });
            setUserData(user);

            Socket.pollSocket(authToken);
        } catch (ex) {
            setServerError({ message: ex.response.data });
        }
    }

    const handleRegister = async userData => {
        try {
          const { data: registerToken } = await UserService.registerUser(
            userData
          );
          handleLogin(
            { email: userData.email, password: userData.password },
            registerToken
          );
        } catch (ex) {
          setServerError({ message: ex.response.data });
        }
    }

    const handleLoginWithAuth = userData => {
        setUser(userData);
        UserService.connectUser(userData);
    }

    useEffect(() => {
        const storedTokens = { ...tokens };

        const registerToken = sessionStorage.getItem('registerToken');
        if (registerToken) storedTokens.registerToken = registerToken;

        const authToken = sessionStorage.getItem('authToken');
        if (authToken) {
            storedTokens.authToken = authToken;
            Socket.pollSocket(authToken);
            UserService.connectUser(user);
        }

        setTokens(storedTokens);
    }, []);

    useEffect(() => {
       if(serverError.message) 
        alert(serverError.message);
    }, [serverError])

    if (!tokens.registerToken)
        return <Register validate={validate} validateProperty={validateProperty} onRegister={handleRegister} />;

    return (
      <Login
        validate={validate}
        validateProperty={validateProperty}
        onLogin={(userData && tokens.authToken )? handleLoginWithAuth : handleLogin}
        user={userData}
        registerToken={tokens.registerToken}
      />
    );
}
 
export default Auth;