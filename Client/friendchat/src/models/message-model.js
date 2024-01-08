import { action, computed } from "easy-peasy";

const messageModel = {
  forwardMessage: action((state, packet) => {
    const { key, msg } = packet;
    const { sender } = msg;
    if (sender === state.user.username) state.rooms[key].readMessages.push(msg);
    else state.rooms[key].unreadMessages.push(msg);
  }),
  onReadMessages: action((state, roomKey) => {
    if (roomKey && state.rooms.hasOwnProperty(roomKey)) {
      const unreadMessages = state.rooms[roomKey].unreadMessages;
      state.rooms[roomKey].readMessages.push(...unreadMessages);
      state.rooms[roomKey].unreadMessages = [];
    }
  }),
  getUnreadMessages: computed((state) => {
    return (key) => state.rooms[key].unreadMessages;
  }),
  getReadMessages: computed((state) => {
    return (key) => state.rooms[key].readMessages;
  }),
};

export default messageModel;
