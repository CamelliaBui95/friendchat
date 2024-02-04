import React, {useState, useEffect} from 'react'
import Conversation from './Conversation';
import MessageService from '../../services/messageServices';
import { useStoreState, useStoreActions } from 'easy-peasy';

const ConversationController = () => {
  const {activeConversation, user} = useStoreState(state => state);
  const [notification, setNotification] = useState("");
  const { onReadMessages } = useStoreActions(actions => actions);
  
  useEffect(() => {
    MessageService.getNotification(setNotification);
  }, [])

  useEffect(() => {
    if(activeConversation)
      onReadMessages(activeConversation._id);
    setNotification("");
  }, [activeConversation])

  const handleSendMessage = (msg) => {
    MessageService.sendMessage({ sender: user._id, to: activeConversation._id, ...msg });
  };

  return (
    <Conversation onSendMessage={handleSendMessage} notification={notification}/>
  )
}

export default ConversationController