import userModel from "./user-model";
import messageModel from "./message-model";
import emojisModel from "./emojis-model";
import authModel from "./auth-model";
import conversationModel from "./conversation-model";
import interestModel from "./interest-model";
import userProfileModel from "./userProfile-model";
import notificationModel from "./notification-model";

const storeModel = {
    ...authModel,
    ...userModel,
    ...conversationModel,
    ...messageModel,
    ...emojisModel,
    ...interestModel,
    ...userProfileModel,
    ...notificationModel,
}

export default storeModel;