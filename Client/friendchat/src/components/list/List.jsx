import React, { useState, useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import UserService from "../../services/userServices";
import "./list.css";
import Card from "../card/Card";

const List = ({ selectedTab, searchValue }) => {
  const usersList = useStoreState((state) => state.usersList);
  const conversationsList = useStoreState((state) => state.conversationsList);
  const {activeConversation} = useStoreState(state => state);
  const hasConversation = useStoreState((state) => state.hasConversation);
  const {
    setAllUsers,
    updateUsers,
    addConversation,
    setActiveConversation,
    updateConversation,
    storeConversation,
    removeConversation
  } = useStoreActions((actions) => actions);

  const handleUserClick = (user) => {
    if (!hasConversation(user._id))
      addConversation({
        _id: user._id,
        master: user.username,
        status: user.status,
        imgUrl: user.imgUrl,
      });

    setActiveConversation(user._id);
  };

  const handleConversationClick = (convo) => {
    setActiveConversation(convo._id);
  };

  const handleCloseConversation = (convo) => {
    if(activeConversation._id === convo._id) {
      setActiveConversation("#public"); 
    }
    storeConversation(convo._id);
    removeConversation(convo._id);
  }

  useEffect(() => {
    UserService.getAllUsers(setAllUsers);
    UserService.updateUserList((updatedUser) => {
      updateUsers(updatedUser);
      updateConversation({
        _id: updatedUser._id,
        master: updatedUser.username,
        status: updatedUser.status,
        imgUrl: updatedUser.imgUrl,
      })
    });
  }, [usersList]);

  let filteredItems;
  if (selectedTab === "users")
    filteredItems = usersList.filter((user) =>
      user.username.toLowerCase().includes(searchValue.toLowerCase())
    );
  else if (selectedTab === "messages")
    filteredItems = conversationsList.filter((convo) =>
      convo.master.toLowerCase().includes(searchValue.toLowerCase())
    );

  return (
    <div className="list-container h-[87%] bg-white w-[100%] rounded-b-xl py-3 px-1">
      <ul className="list h-[100%] overflow-y-auto px-0">
        {selectedTab === "users" &&
          filteredItems.map((user, index) => (
            <Card
              label={user.username}
              index={index}
              imgUrl={user.imgUrl}
              status={user.status}
              onClick={() => handleUserClick(user)}
              onClose={null}
            />
          ))}
        {selectedTab === "messages" &&
          filteredItems.map((convo, index) => (
            <Card
              label={convo.master}
              index={index}
              imgUrl={convo.imgUrl}
              status={convo.status}
              onClick={() => handleConversationClick(convo)}
              onClose={() => handleCloseConversation(convo)}
              countBadge={convo.unreadCount}
            />
          ))}
      </ul>
    </div>
  );
};

export default List;

// {
//   users.map((user, index) => <UserCard user={user} index={index} />);
// }
