import userModel from "./user-model";
import roomModel from "./room-model";
import messageModel from "./message-model";
import emojisModel from "./emojis-model";
import authModel from "./auth-model";
import conversationModel from "./conversation-model";

const storeModel = {
    ...authModel,
    ...userModel,
    ...conversationModel,
    ...roomModel,
    ...messageModel,
    ...emojisModel,
}

export default storeModel;