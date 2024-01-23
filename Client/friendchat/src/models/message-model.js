import { action, computed } from "easy-peasy";

const messageModel = {
  forwardMessage: action((state, packet) => {
    const { id, msg } = packet;
    const { sender } = msg;
    if (sender === state.user._id) state.conversations[key].readMessages.push(msg);
    else state.conversations[key].unreadMessages.push(msg);
  }),
  onReadMessages: action((state, convoID) => {
    if (convoID && state.conversations.hasOwnProperty(convoID)) {
      const unreadMessages = state.conversations[convoID].unreadMessages;
      state.conversations[convoID].readMessages.push(...unreadMessages);
      state.conversations[convoID].unreadMessages = [];
    }
  }),
  getUnreadMessages: computed((state) => {
    return (id) => state.conversations[id].unreadMessages;
  }),
  getReadMessages: computed((state) => {
    return (id) => state.rooms[id].readMessages;
  }),
};

export default messageModel;
