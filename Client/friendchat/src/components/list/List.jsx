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
  const rooms = useStoreState((state) => state.getRooms);
  const hasRoom = useStoreState((state) => state.hasRoom);
  const { setAllUsers, addRoom, setActiveRoom } = useStoreActions(
    (actions) => actions
  );

  useEffect(() => {
    UserService.getAllUsers(setAllUsers);
  }, [users]);

  const handleSelectUser = (user) => {
    if (hasRoom(user.username)) {
      setActiveRoom(user.username);
      return;
    }
    addRoom({
      key: user.username,
      roomId: user.username,
      status: user.status,
      imgUrl: user.imgUrl,
    });
  };

  let filteredItems;
  if (selectedTab === "users")
    filteredItems = users.filter((user) =>
      user.username.toLowerCase().includes(searchValue.toLowerCase())
    );
  else if (selectedTab === "messages")
    filteredItems = rooms.filter((room) =>
      room[0].toLowerCase().includes(searchValue.toLowerCase())
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
              onClick={() => handleSelectUser(user)}
              onClose={null}
            />
          ))}
        {selectedTab === "messages" &&
          filteredItems.map((room, index) => (
            <Card
              label={room[0]}
              index={index}
              imgUrl={room[1].imgUrl}
              status={room[1].status}
              onClose={() => console.log("close")}
              // onClick={() => handleSelectUser(user)}
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
