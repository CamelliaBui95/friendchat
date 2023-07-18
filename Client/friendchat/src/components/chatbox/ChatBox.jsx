import "./chatBox.css";
import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Message from "../message/Message";
import Input from "../input/input";

function ChatBox({ messages, onSendMessage }) {
  const [prevSender, setPrevSender] = useState("");

  const checkSender = sender => {
    if (!sender || prevSender !== sender) {
      setPrevSender(sender);
      return false;
    } else return true;
  }

  return (
    <div className="chat-box">
      <ListGroup as="ul" className="chat-window" variant="flush">
        {messages.map((msg, index) => (
          <Message sender={msg.sender} key={index} payload={msg.payload} onCheckSender={() => checkSender(msg.sender) } />
        ))}
      </ListGroup>

      <Input onSubmit={onSendMessage} />
    </div>
  );
}

export default ChatBox;
