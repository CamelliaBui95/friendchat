import React, {useState, useEffect, useRef} from "react";
import {useStoreState} from "easy-peasy";
import "./conversation.css";
import ConversationHeader from "./ConversationHeader";
import Message from "../message/Message";
import Input from '../input/input';

const Conversation = ({onSendMessage, notification}) => {
  const boxRef = useRef(null);
  const {activeConversation} = useStoreState(state => state);
  const [prevSender, setPrevSender] = useState("");
  const messages = useStoreState(state => state.getMessages(activeConversation._id));

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

  return (
    <div className="h-full overflow-hidden">
      {activeConversation && <ConversationHeader title={activeConversation.master} status={activeConversation.status} imgUrl={activeConversation.imgUrl}/>}
      <div className="h-[90%]">
        <ul className="conversation-box h-[90%] overflow-y-auto overflow-x-hidden" ref={boxRef}>
          {messages.map((msg, index) => <Message sender={msg.sender} key={index} payload={msg.payload} onCheckSender={() => checkSender(msg.sender)}/>)}
          {notification.length > 0 && <p className="w-full mt-2 text-center text-xl italic">{notification}</p>}
        </ul>
        <Input onSubmit={onSendMessage}/>
      </div>
    </div>
  );
};

export default Conversation;
