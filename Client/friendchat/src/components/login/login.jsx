import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import "./login.css";
import { useState, useEffect } from "react";
import  UserService from "../../services/userServices";
import Joi from 'joi';

const Login = ({ validate, validateProperty, onLogin, user, registerToken, onRegister }) => {
  /*const [username, setUsername] = useState("");
  const {onLogin, setLoginError} = useStoreActions(actions => actions); 
  const loginError = useStoreState(state => state.loginError);*/

  const [userData, setUserData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const schema = {
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .min(5)
      .max(50)
      .required(),
    password: Joi.string().min(8).max(255).required(),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate(userData, schema);
    if (errors) return setErrors(errors);

    const error = await onLogin(userData, registerToken);
    if (error) setErrors({password: "Invalid Email or Password"});
  };

  const handleChange = ({currentTarget: input}) => {
    const inputErrors = {...errors};

    const errorMessage = validateProperty(input, schema);
    if (errorMessage) inputErrors[input.name] = errorMessage;
    else delete inputErrors[input.name];

    const data = { ...userData };
    data[input.name] = input.value;

    setUserData(data);
    setErrors(inputErrors);
  };


  if (user) return (
    <div className="login dialog-box">
      <h2>Hello, {user.username} !</h2>
      <Button variant="primary" type="submit" onClick={() => onLogin(user)}>
        Join Chat
      </Button>
    </div>
  );

  return (
    <Form className="login" onSubmit={(e) => handleSubmit(e)}>
      <h2>Log In</h2>
      <Form.Group className="mt-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          className="shadow-none"
          type="text"
          value={userData.email}
          name="email"
          onChange={(e) => handleChange(e)}
        />
        {errors.email && (
          <Alert variant="secondary error-message" className="mt-2">
            {errors.email}
          </Alert>
        )}
      </Form.Group>

      <Form.Group className="mt-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          className="shadow-none"
          type="password"
          value={userData.password}
          name="password"
          onChange={(e) => handleChange(e)}
        />
      </Form.Group>
      {errors.password && (
        <Alert variant="secondary error-message" className="mt-2">
          {errors.password}
        </Alert>
      )}

      <div>
        <Button
          variant="primary mt-3"
          style={{ marginRight: "1rem" }}
          type="submit"
          disabled={validate(userData, schema)}
        >
          Join Chat
        </Button>
        <Button variant="outline-primary mt-3" onClick={onRegister}>
          Sign Up
        </Button>
      </div>
    </Form>
  );
};

export default Login;
