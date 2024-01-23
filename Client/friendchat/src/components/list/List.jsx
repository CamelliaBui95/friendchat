import React, { useState, useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import UserService from "../../services/userServices";
import "./list.css";
import Card from "../card/Card";

const mockUsers = [
  {
    username: "User 1",
    status: "online",
    imgUrl: "../images/cat-user.png",
    email: "user1@abc.com",
    isInPublic: true,
  },
  {
    username: "User 2",
    status: "idle",
    imgUrl: "../images/cat-user-2.png",
    email: "user1@abc.com",
    isInPublic: true,
  },
  {
    username: "User 3",
    status: "busy",
    img: "../images/cat-user-3.png",
    email: "user1@abc.com",
    isInPublic: true,
  },
  {
    username: "User 4",
    status: "idle",
    img: "../images/cat-user-2.png",
    email: "user1@abc.com",
    isInPublic: true,
  },
  {
    username: "User 5",
    status: "online",
    img: "../images/cat-user-4.png",
    email: "user1@abc.com",
    isInPublic: true,
  },
  {
    username: "User 6",
    status: "online",
    img: "../images/cat-user-3.png",
    email: "user1@abc.com",
    isInPublic: true,
  },
  {
    username: "User 7",
    status: "online",
    img: "../images/cat-user-5.png",
    email: "user1@abc.com",
    isInPublic: true,
  },
  {
    username: "User 8",
    status: "online",
    img: "../images/cat-user-6.png",
    email: "user1@abc.com",
    isInPublic: true,
  },
  {
    username: "User 9",
    status: "online",
    img: "../images/cat-user.png",
    email: "user1@abc.com",
    isInPublic: true,
  },
];

const List = ({ selectedTab, searchValue }) => {
  const usersList = useStoreState((state) => state.usersList);
  const conversationsList = useStoreState((state) => state.conversationsList);
  const { allUsers } = useStoreState((state) => state);
  const hasConversation = useStoreState((state) => state.hasConversation);
  const {
    setAllUsers,
    updateUsers,
    addConversation,
    setActiveConversation,
    updateConversation,
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
              onClose={null}
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
