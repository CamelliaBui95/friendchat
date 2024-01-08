import "./App.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useEffect, useState } from "react";
import { useStoreState, useStoreActions, useStoreRehydrated } from "easy-peasy";
import Col from "react-bootstrap/Col";
import Auth from "./components/auth/Auth";
import Users from "./components/users/Users";
import Profile from "./components/profile/Profile";
import Rooms from "./components/rooms/Rooms";
import UserService from "./services/userServices";

function App() {  
  const isRehydrated = useStoreRehydrated();
  const user = useStoreState(state => state.user);
  const rooms = useStoreState(state => state.getRooms);
  const { addRoom, forwardMessage, setLogOut } = useStoreActions(
    (actions) => actions
  );
  const hasRoom = useStoreState((state) => state.hasRoom);
  const logOut = useStoreState(state => state.logOut);

  const handleCheckPacket = (packet) => {
    const { sender, to: receiver } = packet;

    if (receiver === "#public")
      return forwardMessage({ key: receiver, msg: packet });

    if (sender === user.username) {
      if (hasRoom(receiver))
        return forwardMessage({ key: receiver, msg: packet });

      return addRoom({ key: receiver, roomId: receiver, msg: packet });
    }

    if (!hasRoom(sender)) {
      return addRoom({ key: sender, roomId: sender, msg: packet });
    } else forwardMessage({ key: sender, msg: packet });
  };

  useEffect(() => {
    addRoom({ key: "#public", roomId: "#public" });
  }, []);

  useEffect(() => {
    if (user)
      UserService.connectUser(user);
    return () => UserService.disconnect();
  }, []);


  if (!isRehydrated) return <div>Loading...</div>
  if (!user || logOut) return <Auth/>;

  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container fluid>
          <Navbar.Brand href="/" className="logo">
            FriendChat
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => console.log("profile")} className="default">
                My Profile
              </Nav.Link>
              <Nav.Link onClick={() => setLogOut({willLogOut: true})} className="danger">
                Log Out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Col sm={3}>
        <div className="side-bar rounded-top bg-light">
          <Profile />
          <Users />
        </div>
      </Col>
      <Col sm={9}>
        <div className="chat-section">
          <Rooms rooms={rooms} onCheckPacket={handleCheckPacket} />
        </div>
      </Col>
    </>
  );
}

export default App;

/* { sender: user.username,
     payload: {type: String,
               data: String},
     roomId: "#public" }*/

     // abcd1234
