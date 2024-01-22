import "./rooms.css";
import React, { useEffect, useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import MessageService from "../../services/messageServices";
import Room from "../room/Room";

const Rooms = ({ rooms, onCheckPacket }) => {
  const { storeRoomData, removeRoom, setActiveRoom } = useStoreActions(
    (actions) => actions
  );
  const { activeRoom, users } = useStoreState((state) => state);
  const getRoom = useStoreState((state) => state.getRoom);
  const [currentMessage, setCurrentMessage] = useState("");
  const [unreadCount, setUnreadCount] = useState({});
  const [observers, setObserver] = useState([]);

  const handleCountUnreadMessages = (roomKey, count) => {
    const unreadCountList = { ...unreadCount };

    unreadCountList[roomKey] = count;
    setUnreadCount({ ...unreadCountList });
  };

  const handleSelectKey = (eventKey) => {
    setActiveRoom(eventKey);
  };

  const handleCloseRoom = (roomKey) => {
    if (activeRoom === roomKey) setActiveRoom("#public");
    storeRoomData(roomKey); // temporarily store current room's data in localStorage
    removeRoom(roomKey); // remove current room
  };


  useEffect(() => {
    MessageService.getMessage(setCurrentMessage);
  }, []);

  useEffect(() => {
    if (currentMessage) onCheckPacket(currentMessage);
  }, [currentMessage]);

  useEffect(() => {
    handleCountUnreadMessages(activeRoom, 0);
  }, [activeRoom]);

  useEffect(() => {
    const chatWindows = document.getElementsByClassName("chat-window");

    if (chatWindows.length > 0) {
      const chatWindow = chatWindows[chatWindows.length - 1];
      const observer = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList)
          if (mutation.type === "childList")
            chatWindow.scrollTop = chatWindow.scrollHeight;
      });

      observer.observe(chatWindow, { childList: true });

      setObserver([...observers, observer]);
    }
  }, [rooms]);

  const renderTabTitle = (tabKey) => {
    return (
      <>
        {tabKey}
        {unreadCount[tabKey] > 0 && activeRoom !== tabKey && (
          <span className="unread-badge">
            <span className="badge-content">{unreadCount[tabKey]}</span>
          </span>
        )}
        {tabKey !== "#public" && (
          <span
            className="close-button"
            onClick={() => handleCloseRoom(tabKey)}
          >
            X
          </span>
        )}
      </>
    );
  };

  return (
    <>
      <Room
        roomKey={activeRoom}
        roomInfo={getRoom(activeRoom)}
        onCountUnread={handleCountUnreadMessages}
        observer={observers[observers.length - 1]}
      />
    </>
  );
};

export default Rooms;

{
  /* <Tabs
  className="mb-3 tabs bg-light"
  activeKey={activeRoom}
  onSelect={(eventKey) => handleSelectKey(eventKey)}
>
  {rooms.map(([key], index) => (
    <Tab eventKey={key} title={renderTabTitle(key)} key={index}>
      <Room
        roomKey={key}
        key={index}
        onCountUnread={handleCountUnreadMessages}
        observer={observers[observers.length - 1]}
      />
    </Tab>
  ))}
</Tabs>; */
}
