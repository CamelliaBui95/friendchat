import { computed, action } from "easy-peasy";

const notificationModel = {
    notifications: [],
    addNotification: action((state, notification) => {
        state.notifications.push(notification);
    }),
    shiftNotifications: action((state) => {
        state.notifications.shift();
    })
};

export default notificationModel;