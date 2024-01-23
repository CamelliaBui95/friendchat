import React, {useState, useEffect} from "react";
import {useStoreState, useStoreActions} from "easy-peasy";
import "./conversation.css";
import ConversationHeader from "./ConversationHeader";

const Conversation = () => {
  const {activeConversation} = useStoreState(state => state);

  return (
    <div className="h-full">
      <ConversationHeader title={activeConversation.master} status={activeConversation.status} imgUrl={activeConversation.imgUrl}/>
      <div className="h-[90%]">
        <ul className="conversation-box overflow-y-auto">

        </ul>
      </div>
    </div>
  );
};

export default Conversation;
