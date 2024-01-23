import React, {useState, useEffect} from 'react'
import Conversation from './Conversation';
import MessageService from '../../services/messageServices';
import { useStoreState } from 'easy-peasy';

const ConversationController = ({onCheckPacket}) => {
  const {activeConversation, user} = useStoreState(state => state);
  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
    MessageService.getMessage(setCurrentMessage);
  }, []);

  useEffect(() => {
    if (currentMessage) onCheckPacket(currentMessage);
  }, [currentMessage])
  
  const handleSendMessage = (msg) => {
    MessageService.sendMessage({ sender: user._id, to: activeConversation._id, ...msg });
  };

  return (
    <Conversation onSendMessage={handleSendMessage} />
  )
}

export default ConversationController