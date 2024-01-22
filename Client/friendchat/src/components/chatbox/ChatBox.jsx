import "./chatBox.css";
import React, { useEffect, useState } from "react";
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
    <div className="chat-box h-[90%]">
      <ul className="chat-window">
        {messages.map((msg, index) => (
          <Message sender={msg.sender} key={index} payload={msg.payload} onCheckSender={() => checkSender(msg.sender) } />
        ))}
      </ul>

      <Input onSubmit={onSendMessage} />
    </div>
  );
}

export default ChatBox;
