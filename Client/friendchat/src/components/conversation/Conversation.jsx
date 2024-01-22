import React from "react";
import "./conversation.css";

const mockConversation = {
  username: "Test User 2",
  status: "online",
  imgUrl: "../images/cat-user.png",
};

const Conversation = () => {
  return (
    <div className="h-full">
      <div className="conversation-info flex flex-row justify-start items-center h-[10%] p-2 rounded-t-lg bg-white">
        <div className="flex flex-row relative">
          <img
            src={mockConversation.imgUrl}
            className="w-[50px] rounded-full"
          />
          <i
            className={
              "fa fa-circle absolute bottom-0 right-0 " +
              mockConversation.status
            }
          ></i>
        </div>
        <p className="mb-0 ml-2 text-xl font-semibold">{mockConversation.username}</p>
      </div>
      <div className="h-[90%]">
        <ul className="conversation-box overflow-y-auto">

        </ul>
      </div>
    </div>
  );
};

export default Conversation;
