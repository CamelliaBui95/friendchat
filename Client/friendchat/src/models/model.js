import userModel from "./user-model";
import roomModel from "./room-model";
import messageModel from "./message-model";
import emojisModel from "./emojis-model";

const storeModel = {
    ...userModel,
    ...roomModel,
    ...messageModel,
    ...emojisModel
}

export default storeModel;