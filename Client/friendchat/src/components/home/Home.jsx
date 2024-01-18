import React, {useState, useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import "./home.css";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Row className="wrapper px-8 py-5 overflow-hidden h-85">

      <Col className="slogan">
        <h2 className="text-white text-xl">
          Connect to be <span className="highlight-dark-blue text-bold-7">yourself</span>
        </h2>
        <p className="text-blue-dark text-md">
          Speak your mind, chat your heart with +10,000 members on our platform.
        </p>
        <Button className='primary-btn' as={Link} to='login'>Let's Start</Button>
      </Col>

      <Col lg={7} className="relative">
        <img
          src="../images/friendChat_landingImg.png"
          alt=""
          className="landing-img absolute"
        />
      </Col>
    </Row>
  );
}

export default Home