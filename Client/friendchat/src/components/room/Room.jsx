import React, { useState, useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import ChatBox from "../chatbox/ChatBox";
import MessageService from "../../services/messageServices";
import "./room.css"

const Room = ({ roomKey, onCountUnread, observer, roomInfo }) => {
  const { user, activeRoom } = useStoreState((state) => state);
  const { onReadMessages } = useStoreActions((actions) => actions);
  const readMessages = useStoreState((state) => state.getReadMessages(roomKey));
  const unreadMessages = useStoreState((state) =>
    state.getUnreadMessages(roomKey)
  );

  const [messages, setMessages] = useState([]);

  const handleSendMessage = (msg) => {
    MessageService.sendMessage({ sender: user.username, to: roomKey, ...msg });
  };

  useEffect(() => {
    return () => observer && observer.disconnect();
  }, []);

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
  }, [unreadMessages, activeRoom]);

  return (
    <>
      <div className="chatbox-info flex flex-row justify-start items-center h-[10%] bg-white rounded-t-xl p-2 shadow-md">
        <div className="flex flex-row relative">
          <img src={roomInfo.imgUrl} className="w-[50px] rounded-full"/>
          <i className={"fa fa-circle absolute bottom-0 right-0 " + roomInfo.status}></i>
        </div>
        <p className="mb-0 ml-2 text-xl font-semibold">{roomKey}</p>
      </div>
      <ChatBox messages={messages} onSendMessage={handleSendMessage} />
    </>
  );
};

export default Room;
