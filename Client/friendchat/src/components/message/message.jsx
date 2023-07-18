import { useStoreState } from "easy-peasy";
import "./message.css";
import React, {useEffect, useState} from "react";
import ListGroup from "react-bootstrap/esm/ListGroup";

function Message({ sender, payload, onCheckSender }) {
  const { user } = useStoreState(state => state);
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
    user.username === sender ? "ms-2 ms-auto bubble bubble-right" : "ms-2 me-auto bubble bubble-left";
  
  return (
    <ListGroup.Item
      as="li"
      className="d-flex flex-column justify-content-between align-items-start"
    >
      {renderSender && user.username !== sender && (
        <div className="fw-bold ms-2 mb-2">{sender}</div>
      )}
      <div className={msgClassName}>{renderMessage()}</div>
    </ListGroup.Item>
  );
}

export default Message;

/*message = {
  sender: "",
  payload: {
    type: <text or image>
    data: ""
  }
} */
