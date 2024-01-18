import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import "./login.css";
import { useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import {validate, validateProperty} from "../../utils/dataValidator";
import Joi from 'joi';
import { Link } from "react-router-dom";

const Login = () => {
  const { handleLogin, handleLoginWithAuth, handleRegister } = useStoreActions(actions => actions);
  const { userToken, user } = useStoreState(state => state);
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

    const error = await handleLogin({ userData, userToken });
    if (error) setErrors({password: error});
  };

  const handleChange = ({ currentTarget: input }) => {
    const inputErrors = { ...errors };

    const errMsg = validateProperty({ input, schema });
    if (errMsg) inputErrors[input.name] = errMsg;
    else delete inputErrors[input.name];

    const data = { ...userData };
    data[input.name] = input.value;

    setUserData(data);
    setErrors(inputErrors);
  };


  if (user) return (
    <div className="login dialog-box">
      <h2>Hello, {user.username} !</h2>
      <Button variant="primary" type="submit" onClick={() => handleLoginWithAuth(user)}>
        Join Chat
      </Button>
    </div>
  );

  return (
    <Form className="login text-pink" onSubmit={(e) => handleSubmit(e)}>
      <h2 className="text-center">Log In</h2>
      <Form.Group className="mt-3" controlId="email">
        <Form.Label className="text-md">Email</Form.Label>
        <Form.Control
          className="shadow-none form-input"
          type="text"
          value={userData.email}
          name="email"
          onChange={(e) => handleChange(e)}
        />
      </Form.Group>
      {errors.email && <p className="error-message">{errors.email}</p>}

      <Form.Group className="mt-3" controlId="password">
        <Form.Label className="text-md">Password</Form.Label>
        <Form.Control
          className="shadow-none form-input"
          type="password"
          value={userData.password}
          name="password"
          onChange={(e) => handleChange(e)}
        />
      </Form.Group>
      {errors.password && <p className="error-message">{errors.password}</p>}

      <div>
        <Button
          className="secondary-btn text-md"
          variant="primary mt-4"
          style={{ marginRight: "1rem" }}
          type="submit"
          disabled={validate({userData, schema})}
        >
          Join Chat
        </Button>
        <Button
          variant="outline-primary mt-4"
          className="secondary-btn-outline text-md"
          as={Link}
          to="/register"
        >
          Sign Up
        </Button>
      </div>
    </Form>
  );
};

export default Login;
