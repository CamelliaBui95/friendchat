import { action, computed } from "easy-peasy";

const messageModel = {
  forwardMessage: action((state, packet) => {
    const { key, msg } = packet;
    const { sender } = msg;
    state.conversations[key].messages.push(msg);

    if (sender !== state.user._id && key !== state.activeConversation._id)
      state.conversations[key].unreadCount += 1;
  }),
  onReadMessages: action((state, convoID) => {
    if (convoID && state.conversations.hasOwnProperty(convoID))
      state.conversations[convoID].unreadCount = 0;
  }),
  getMessages: computed((state) => {
    return (id) => state.conversations[id].messages;
  }),
};

export default messageModel;
