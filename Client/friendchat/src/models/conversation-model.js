import { action, thunk, computed } from "easy-peasy";

const conversationModel = {
  activeConversation: {},
  conversations: {},
  addConversation: action((state, conversation) => {
    const { _id, master, status, imgUrl, message } = conversation;
    if (localStorage.getItem(_id)) {
      const cachedConversation = JSON.parse(localStorage.getItem(_id));
      state.conversations[_id] = cachedConversation;
      localStorage.removeItem(_id);
    } else {
      state.conversations[_id] = {
        _id,
        master,
        status,
        imgUrl,
        messages: [],
        unreadCount: 0
      };
    }

    if (message) {
      state.conversations[_id].messages.push(message);
      state.conversations[_id].unreadCount += 1;
    }
    else state.activeConversation = state.conversations[_id];
  }),
  getConversations: computed((state) => Object.values(state.conversations)),
  updateConversation: action((state, updatedData) => {
    const id = updatedData._id;
    if (!state.conversations.hasOwnProperty(id)) return;

    const currentConvo = state.conversations[id];

    state.conversations[id] = { ...currentConvo, ...updatedData };

    if(state.activeConversation._id === id)
        state.activeConversation = state.conversations[id];
  }),
  conversationsList: computed((state) => Object.values(state.conversations)),
  hasConversation: computed((state) => {
    return (id) => state.conversations.hasOwnProperty(id);
  }),
  removeConversation: action((state, id) => {
    delete state.conversations[id];
    if (state.activeConversation._id === id)
      state.activeConversation = state.conversations["#public"];
  }),
  storeConversation: action((state, id) => {
    const conversation = state.conversations[id];
    if (conversation) localStorage.setItem(id, JSON.stringify(conversation));
  }),
  setActiveConversation: action((state, id) => {
    state.activeConversation = state.conversations[id];
  })
};

export default conversationModel;

/**
 conversationId = {
    id: user.id,
    status: user.status,
    imgUrl,
    readMsg: [],
    unreadMsg: []
 }
 * 
 */
