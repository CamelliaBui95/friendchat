import { action, thunk, computed } from "easy-peasy";

const roomModel = {
  rooms: {},
  addRoom: action((state, { key, roomId, msg, imgUrl, status }) => {
    if (localStorage.getItem(key)) {
      const cachedRoomData = JSON.parse(localStorage.getItem(key));
      state.rooms[key] = cachedRoomData;
      localStorage.removeItem(key);
    } else {
      state.rooms[key] = {
        roomId,
        status,
        imgUrl,
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
};

export default roomModel;
