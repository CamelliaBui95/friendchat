import { action, thunk, computed } from "easy-peasy";
import UserService from "./services/userServices";

const model = {
  /**User data management */
  user: null,
  setUser: action((state, user) => {
    state.user = user;
  }),
  setUserStatus: action((state, status) => {
    state.user.status = status;
    UserService.updateUserStatus(status);
  }),

  logOut: false,
  setLogOut: action((state, { willLogOut }) => {
    state.logOut = willLogOut;
    if (willLogOut) {
      UserService.disconnect();
      state.user = null;
    }
  }),

  allUsers: [],
  setAllUsers: action((state, payload) => {
    state.allUsers = payload;
  }),

  /** Room Management */
  rooms: {},
  addRoom: action((state, { key, roomId, msg }) => {
    if (localStorage.getItem(key)) {
      const cachedRoomData = JSON.parse(localStorage.getItem(key));
      state.rooms[key] = cachedRoomData;
      localStorage.removeItem(key);
    } else {
      state.rooms[key] = {
        roomId,
        readMessages: [],
        unreadMessages: [],
      };
    }

    if (msg) state.rooms[key].unreadMessages.push(msg);
    else state.activeRoom = key;
  }),
  updateRoom: action((state, { roomKey, roomData }) => {
    state.rooms[roomKey] = roomData;
    state.activeRoom = roomKey;
  }),
  getRooms: computed((state) => Object.entries(state.rooms)),
  getRoom: computed((state) => {
    return (key) => state.rooms[key];
  }),
  hasRoom: computed((state) => {
    return (key) => state.rooms.hasOwnProperty(key);
  }),
  roomKeys: computed((state) => Object.keys(state.rooms)),
  removeRoom: action((state, roomKey) => {
    delete state.rooms[roomKey];
    if (state.activeRoom === roomKey) state.activeRoom = "#public";
  }),
  storeRoomData: action((state, roomKey) => {
    const room = state.rooms[roomKey];
    if (room) localStorage.setItem(roomKey, JSON.stringify(room));
  }),

  /** */
  activeRoom: "",
  setActiveRoom: action((state, roomKey) => {
    if (
      !roomKey ||
      state.rooms.length === 0 ||
      !state.rooms.hasOwnProperty(roomKey)
    )
      state.activeRoom = "#public";
    else state.activeRoom = roomKey;
  }),

  /** Messages Management */
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

export default model;
