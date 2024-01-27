import { useStoreState } from "easy-peasy";
import "./message.css";
import React, {useEffect, useState} from "react";

function Message({ sender, payload, onCheckSender }) {
  const { user } = useStoreState(state => state);
  const senderData = useStoreState(state => state.getUser(sender));
  const [renderSender, setRenderSender] = useState(true);

  useEffect(() => {
    setRenderSender(!onCheckSender());
  }, [])

  const renderMessage = () => {
    const { type, data } = payload;

    if (/^image/.test(type)) {
      return <img src={data} width="400px" alt=""/> 
    }
    
    return payload.data;
  }

  const msgClassName =
    user._id === sender ? "mr-[30px] ms-auto bubble bubble-right" : "ml-[40px] bubble bubble-left";
  
  return (
    <li
      className="flex flex-col justify-between items-start"
    >
      {renderSender && user._id !== sender && (
        <div className="mt-2 mb-1 flex flex-row justify-start items-center relative">
          <img src={senderData.profile.imgUrl} width="40px" className="rounded-full shadow-md"/>
          <p className="mb-0 ml-1 font-semibold text-lg">{senderData.username}</p>
        </div>
      )}
      <div className={msgClassName + " my-1 break-all"}>{renderMessage()}</div>
    </li>
  );
}

export default Message;
