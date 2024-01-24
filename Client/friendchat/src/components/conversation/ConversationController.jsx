import React, {useState, useEffect} from 'react'
import Conversation from './Conversation';
import MessageService from '../../services/messageServices';
import { useStoreState, useStoreActions } from 'easy-peasy';

const ConversationController = ({onCheckPacket}) => {
  const {activeConversation, user} = useStoreState(state => state);
  const [currentMessage, setCurrentMessage] = useState("");
  const {onReadMessages} = useStoreActions(actions => actions);

  useEffect(() => {
    MessageService.getMessage(setCurrentMessage);
  }, []);

  useEffect(() => {
    if (currentMessage) onCheckPacket(currentMessage);
  }, [currentMessage])

  useEffect(() => {
    onReadMessages(activeConversation._id);
  }, [activeConversation])

  
  const handleSendMessage = (msg) => {
    console.log(user)
    MessageService.sendMessage({ sender: user._id, to: activeConversation._id, ...msg });
  };

  return (
    <Conversation onSendMessage={handleSendMessage} />
  )
}

export default ConversationController