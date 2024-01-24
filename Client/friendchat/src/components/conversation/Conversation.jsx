import React, {useState, useEffect} from "react";
import {useStoreState, useStoreActions} from "easy-peasy";
import "./conversation.css";
import ConversationHeader from "./ConversationHeader";
import Message from "../message/Message";
import Input from '../input/input';

const Conversation = ({onSendMessage}) => {
  const {activeConversation} = useStoreState(state => state);
  const [prevSender, setPrevSender] = useState("");
  const messages = useStoreState(state => state.getMessages(activeConversation._id));

  const checkSender = sender => {
    if (!sender || prevSender !== sender) {
      setPrevSender(sender);
      return false;
    } else return true;
  }

  return (
    <div className="h-full">
      <ConversationHeader title={activeConversation.master} status={activeConversation.status} imgUrl={activeConversation.imgUrl}/>
      <div className="h-[90%]">
        <ul className="conversation-box h-[90%] overflow-y-auto">
          {messages && messages.map((msg, index) => <Message sender={msg.sender} key={index} payload={msg.payload} onCheckSender={() => checkSender(msg.sender)}/>)}
        </ul>
        <Input onSubmit={onSendMessage}/>
      </div>
    </div>
  );
};

export default Conversation;
