import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useEffect, useState } from "react";
import Socket from "../services/socket";
import UserService from "../services/userServices";
import MessageService from "../services/messageServices";

const Root = ({ children: Component }) => {
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
      <Row>{Component}</Row>
    </Container>
  );
};

export default Root;
