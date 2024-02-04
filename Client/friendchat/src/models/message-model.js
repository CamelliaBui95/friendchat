import { action, computed } from "easy-peasy";

const messageModel = {
  currentMessage: "",
  totalUnreadCount: 0,
  setCurrentMessage: action((state, msg) => {
    state.currentMessage = msg;
  }),
  forwardMessage: action((state, packet) => {
    const { key, msg } = packet;
    const { sender } = msg;
    state.conversations[key].messages.push(msg);

    if (sender !== state.user._id && key !== state.activeConversation._id) {
      state.conversations[key].unreadCount += 1;
      state.totalUnreadCount += 1;
    }
      
  }),
  onReadMessages: action((state, convoID) => {
    if (convoID && state.conversations.hasOwnProperty(convoID)) {
      const{ unreadCount } = state.conversations[convoID];
      state.totalUnreadCount -= unreadCount;
      state.conversations[convoID].unreadCount = 0;
    }
      
  }),
  getMessages: computed((state) => {
    return (id) => state.conversations[id].messages;
  }),
  getConversationUnreadCount: computed((state) => {
    return (id) => state.conversations[id].unreadCount;
  })
};

export default messageModel;
