import React, { useState, useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import ChatBox from "../chatbox/ChatBox";
import MessageService from "../../services/messageServices";

const Room = ({ roomKey, onCountUnread, observer }) => {
  const { user, activeRoom } = useStoreState((state) => state);
  const { onReadMessages } = useStoreActions(actions => actions);
  const readMessages = useStoreState((state) => state.getReadMessages(roomKey));
  const unreadMessages = useStoreState(state => state.getUnreadMessages(roomKey));
  
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (msg) => {
    MessageService.sendMessage({ sender: user.username, to: roomKey, ...msg });
  };

  useEffect(() => {

    return () => observer && observer.disconnect();
  }, [])

  useEffect(() => {
    setMessages(readMessages);
  }, [readMessages]);

  useEffect(() => {
    if (activeRoom === roomKey) {
      if (unreadMessages.length > 0) {
        onReadMessages(roomKey);
        onCountUnread(roomKey, 0);
      }        
    } else onCountUnread(roomKey, unreadMessages.length);
      
  }, [unreadMessages, activeRoom])

  return (<ChatBox messages={messages} onSendMessage={handleSendMessage} />);
};

export default Room;
