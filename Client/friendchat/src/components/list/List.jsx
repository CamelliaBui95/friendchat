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
  const { allUsers: users } = useStoreState((state) => state);
  const { setAllUsers } = useStoreActions(
    (actions) => actions
  );

  useEffect(() => {
    UserService.getAllUsers(setAllUsers);
  }, [users]);


  let filteredItems;
  if (selectedTab === "users")
    filteredItems = users.filter((user) =>
      user.username.toLowerCase().includes(searchValue.toLowerCase())
    );
  else if (selectedTab === "messages")
    filteredItems = users.filter((user) =>
    user.username.toLowerCase().includes(searchValue.toLowerCase())
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
              onClick={() => console.log(user)}
              onClose={null}
            />
          ))}
        {selectedTab === "messages" &&
          filteredItems.map((user, index) => (
            <Card
              label={user.username}
              index={index}
              imgUrl={user.imgUrl}
              status={user.status}
              onClick={() => console.log(user)}
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
