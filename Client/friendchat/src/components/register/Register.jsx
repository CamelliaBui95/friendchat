import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import "./register.css";
import { useState, useEffect } from "react";
import Joi from "joi";

const Register = ({onRegister, validate, validateProperty}) => {
  const [userData, setUserData] = useState({username: "", email: "", password: ""});
  const [errors, setErrors] = useState({});

  const schema = {
    username: Joi.string().min(3).max(50).required(),
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

    onRegister(userData);
  };

  const handleChange = ({ currentTarget: input }) => {
    const inputErrors = { ...errors };

    const errorMessage = validateProperty(input, schema);

    if (errorMessage) inputErrors[input.name] = errorMessage;
    else delete inputErrors[input.name];

    const data = { ...userData };
    data[input.name] = input.value;

    setErrors(inputErrors);
    setUserData(data);
  };

  return (
    <Form className="register" onSubmit={(e) => handleSubmit(e)}>
      <h2>Register</h2>

      <Form.Group className="mt-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control
          className="shadow-none"
          type="text"
          value={userData.username}
          name="username"
          onChange={(e) => handleChange(e)}
        />
        {errors.username && (
          <Alert variant="secondary error-message">{errors.username}</Alert>
        )}
      </Form.Group>

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
          <Alert variant="secondary error-message">{errors.email}</Alert>
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
        <Alert variant="secondary error-message">{errors.password}</Alert>
      )}

      <Button
        variant="primary mt-3"
        type="submit"
        disabled={validate(userData, schema)}
      >
        Sign Up
      </Button>
    </Form>
  );
};

export default Register;
