const {  getSocket } = require("./userHandlers");

const messagesDelivery = (io, socket) => {  
    socket.on("chat_message", packet => {
        console.log(packet)
        const receiver = packet.to;
        if (receiver === "#public")
            io.to(receiver).emit("chat_message", packet);
        else {
            const senderSocket = getSocket(packet.sender);
            const receiverSocket = getSocket(receiver);
            if (receiverSocket)
                io.to([senderSocket.id, receiverSocket.id]).emit("chat_message", packet);
            else
                io.to(senderSocket.id).emit("get_notified", "This User has disconnected");
        }
    });

    socket.on("notification", notification => {
        const toSocket = getSocket(notification.to);
        const fromSocket = getSocket(notification.from);

        if (toSocket) {
            io.to(toSocket.id).emit("get_notification", notification);
            if (notification.hasOwnProperty("message") && notification.message !== null) {
                io.to([toSocket.id, fromSocket.id]).emit("chat_message", {
                  sender: notification.from,
                  to: notification.to,
                  payload: notification.message.payload,
                });
            }
            
        }
            
    })
}

module.exports = { messagesDelivery };

/* { sender: sender._id,
     payload: {type: String,
               data: String},

     to: user._id }*/

/**
 * {
 *    to: userId,
 *    notification: String
 * }
 */