import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useEffect, useState } from "react";
import Socket from "./services/socket";
import UserService from "./services/userServices";
import MessageService from "./services/messageServices";
import { Link, Outlet } from "react-router-dom";
import "./root.css";

const Root = () => {
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    /**Subscribe UserService and MessageService as io Socket's observers.
     * The two classes above will get notified when io socket is polled successfully */
    Socket.addHandler(UserService);
    Socket.addHandler(MessageService);

    const authToken = sessionStorage.getItem("authToken");
    if (authToken) Socket.pollSocket(authToken);
    else return;

    Socket.hasConnected(setSocketConnected);
  }, []);

  if (!socketConnected && sessionStorage.getItem("authToken"))
    return <div>Loading...</div>;

  return (
    <Container fluid>
      <Row>
      <Navbar>
        <Container fluid className="px-3">
          <Navbar.Brand href="/" className="logo ml-1">
            FriendChat
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="nav-item mx-3">
                About
              </Nav.Link>
              <Nav.Link as={Link} to="home" className="nav-item mx-3">
                Log In
              </Nav.Link>
              <Nav.Link as={Link} to="register" className="nav-item mx-3">
                Sign Up
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </Row>
      <Row><Outlet/></Row>
    </Container>
  );
};

export default Root;
