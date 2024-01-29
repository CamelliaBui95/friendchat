import userModel from "./user-model";
import roomModel from "./room-model";
import messageModel from "./message-model";
import emojisModel from "./emojis-model";
import authModel from "./auth-model";
import conversationModel from "./conversation-model";
import interestModel from "./interest-model";

const storeModel = {
    ...authModel,
    ...userModel,
    ...conversationModel,
    ...roomModel,
    ...messageModel,
    ...emojisModel,
    ...interestModel
}

export default storeModel;