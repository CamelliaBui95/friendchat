import React, {useState, useEffect, useRef} from "react";
import {useStoreState, useStoreActions} from "easy-peasy";
import "./conversation.css";
import ConversationHeader from "./ConversationHeader";
import Message from "../message/Message";
import Input from '../input/input';

const Conversation = ({onSendMessage, notification}) => {
  const boxRef = useRef(null);
  const {activeConversation} = useStoreState(state => state);
  const [prevSender, setPrevSender] = useState("");
  const getMessages = useStoreState(state => state.getMessages);
  const [messages, setMessages] = useState([]);

  const checkSender = sender => {
    if (!sender || prevSender !== sender) {
      setPrevSender(sender);
      return false;
    } else return true;
  }

  useEffect(() => {
   
    const observer = new MutationObserver((list) => {
      for(let m of list)
        if(m.type === "childList")
          if(boxRef.current)
            boxRef.current.scrollTop = boxRef.current.scrollHeight;
    })

    if(boxRef.current)
        observer.observe(boxRef.current, {childList: true});

    return () => observer.disconnect();
  }, [])

  useEffect(() => {
    if(activeConversation)
      setMessages(getMessages(activeConversation._id));

  }, [activeConversation])

  return (
    <div className="h-full overflow-hidden">
      {activeConversation && <ConversationHeader title={activeConversation.master} status={activeConversation.status} imgUrl={activeConversation.imgUrl}/>}
      <div className="h-[90%]">
        <ul className="conversation-box h-[90%] overflow-y-auto" ref={boxRef}>
          {messages.map((msg, index) => <Message sender={msg.sender} key={index} payload={msg.payload} onCheckSender={() => checkSender(msg.sender)}/>)}
          {notification.length > 0 && <p className="w-full mt-2 text-center text-xl italic">{notification}</p>}
        </ul>
        <Input onSubmit={onSendMessage}/>
      </div>
    </div>
  );
};

export default Conversation;
