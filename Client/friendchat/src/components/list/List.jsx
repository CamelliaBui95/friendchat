import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";
import UserService from "../../services/userServices";
import "./list.css";
import Card from "../card/Card";

const List = ({ selectedTab, searchValue }) => {
  const navigate = useNavigate();
  const usersList = useStoreState((state) => state.usersList);
  const conversationsList = useStoreState((state) => state.conversationsList);
  const {activeConversation, user} = useStoreState(state => state);
  
  const {
    setAllUsers,
    updateUsers,
    setActiveConversation,
    updateConversation,
    storeConversation,
    removeConversation
  } = useStoreActions((actions) => actions);

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
        imgUrl: updatedUser.profile.imgUrl,
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
          filteredItems.map((u, index) => (
            <Card
              label={u.username}
              index={index}
              imgUrl={u.profile.imgUrl}
              status={u.status}
              onClick={() => navigate(`/app/${user._id}/profile/${u._id}`)}
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
