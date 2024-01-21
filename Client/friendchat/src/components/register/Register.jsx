import "./register.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";
import { validate, validateProperty } from "../../utils/dataValidator";
import Joi from "joi";
import { Link } from "react-router-dom";

const userImages = [
  "../images/cat-user.png",
  "../images/cat-user-2.png",
  "../images/cat-user-3.png",
  "../images/cat-user-4.png",
  "../images/cat-user-5.png",
  "../images/cat-user-6.png",
];

const Register = () => {
  const { handleRegister, fetchAllUsernames } = useStoreActions(actions => actions);
  const { authError, allUsernames, user } = useStoreState(state => state);
  const [userData, setUserData] = useState({username: "", email: "", password: ""});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const schema = {
    username: Joi.string().min(3).max(50).required().label("Username"),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .min(5)
      .max(50)
      .required()
      .label("Email"),
    password: Joi.string().min(8).max(255).required().label("Password"),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate({userData, schema});
    
    if (errors) return setErrors(errors);

    const imgUrl = userImages[Math.floor(Math.random() * userImages.length)];

    await handleRegister({...userData, imgUrl});
    if (authError === null) {
      navigate("/login");
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    const inputErrors = { ...errors };

    const errorMessage = validateProperty({input, schema});
  
    if (errorMessage) inputErrors[input.name] = errorMessage;
    else delete inputErrors[input.name];

    if (input.name === "username" && !inputErrors.hasOwnProperty("username"))
      if (!isUsernameAvailable(input.value))
        inputErrors["username"] = "Username already exists";
    else delete inputErrors[input.name];

    const data = { ...userData };
    data[input.name] = input.value;

    setErrors(inputErrors);
    setUserData(data);
  };

  const isUsernameAvailable = username => {
    return allUsernames.find(user => user.username === username) === undefined;
  }

  useEffect(() => {
    if (authError)
      setErrors({email: authError});

  }, [authError])

  useEffect(() => {
    fetchAllUsernames();
  }, [])

  return (
    <div className="form-container pt-[7rem]">
      <form className="register text-pink" onSubmit={(e) => handleSubmit(e)}>
        <h2 className="text-center">Register</h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="text-xl">
            Username
          </label>
          <input
            id="username"
            type="text"
            className="form-input rounded-xl text-lg"
            value={userData.username}
            name="username"
            onChange={(e) => handleChange(e)}
          />
          {errors.username && (
            <p className="error-message">{errors.username}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 mt-3">
          <label htmlFor="email" className="text-xl">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="form-input rounded-xl text-lg"
            value={userData.email}
            name="email"
            onChange={(e) => handleChange(e)}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="flex flex-col gap-2 mt-3">
          <label htmlFor="password" className="text-xl">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="form-input rounded-xl text-lg"
            value={userData.password}
            name="password"
            onChange={(e) => handleChange(e)}
          />
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
        </div>
        <div className="mt-4">
          <button
            className="secondary-btn text-xl"
            style={{ marginRight: "1rem" }}
            type="submit"
            disabled={
              validate({ userData, schema }) || Object.keys(errors).length !== 0
            }
          >
            Sign Up
          </button>
          <Link
            className="secondary-btn-outline text-xl"
            to="/login"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

{/* <Form className="register text-pink" onSubmit={(e) => handleSubmit(e)}>
      <h2 className="text-center">Register</h2>

      <Form.Group className="mt-3" controlId="username">
        <Form.Label className="text-md">Username</Form.Label>
        <Form.Control
          className="shadow-none form-input"
          type="text"
          value={userData.username}
          name="username"
          onChange={(e) => handleChange(e)}
        />
        {errors.username && <p className="error-message">{errors.username}</p>}
      </Form.Group>

      <Form.Group className="mt-3" controlId="email">
        <Form.Label className="text-md">Email</Form.Label>
        <Form.Control
          className="shadow-none form-input"
          type="text"
          value={userData.email}
          name="email"
          onChange={(e) => handleChange(e)}
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
      </Form.Group>

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
      {errors.password && (
        <Alert variant="secondary error-message" className="mt-2">
          {errors.password}
        </Alert>
      )}

      <Button
        className="secondary-btn text-md"
        variant="primary mt-4"
        style={{ marginRight: "1rem" }}
        type="submit"
        disabled={
          validate({ userData, schema }) || Object.keys(errors).length !== 0
        }
      >
        Sign Up
      </Button>
      <Button
        variant="outline-primary mt-4"
        className="secondary-btn-outline text-md mt-3"
        as={Link}
        to="/login"
      >
        Log In
      </Button>
    </Form> */}

export default Register;
