import React from 'react';
import "./conversation.css";

const ConversationHeader = ({imgUrl, status, title}) => {
  return (
    <div className="conversation-info flex flex-row justify-start items-center h-[10%] p-2 rounded-t-lg bg-white">
        <div className="flex flex-row relative">
          <img
            src={imgUrl}
            className="w-[50px] rounded-full"
          />
          <i
            className={
              "fa fa-circle absolute bottom-0 right-0 " +
              status
            }
          ></i>
        </div>
        <p className="mb-0 ml-2 text-xl font-semibold">{title}</p>
      </div>
  )
}

export default ConversationHeader