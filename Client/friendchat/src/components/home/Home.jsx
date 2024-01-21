import React, { useState, useEffect } from 'react';
import { useStoreState } from 'easy-peasy';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import "./home.css";
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const { user } = useStoreState(state => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate(`app/${user.username}`);
  }, [user]);

  return (
    <div className="wrapper grid grid-cols-1 sm:grid-cols-12 overflow-hidden ">
      <div className="slogan col-span-5 place-self-center flex flex-col flex-wrap justify-center">
        <h2 className="text-white text-4xl">
          Connect to be{" "}
          <span className="highlight-dark-blue text-bold-7">yourself</span>
        </h2>
        <p className="text-blue-dark text-xl">
          Speak your mind, chat your heart with +10,000 members on our platform.
        </p>
        <Button className="primary-btn w-full sm:w-fit" as={Link} to="login">
          Let's Start
        </Button>
      </div>

      <div className="relative col-span-7 place-self-center">
        <img
          src="../images/friendChat_landingImg.png"
          alt="landing image"
          className="landing-img 3xl:w-[900px]"
        />
      </div>
    </div>
  );
}

export default Home