const {  getSocket } = require("./userHandlers");

const messagesDelivery = (io, socket) => {  
    socket.on("chat_message", packet => {
        const receiver = packet.to;
        if(receiver === "#public")
            io.to(receiver).emit("chat_message", packet);
        else {
            const senderSocket = getSocket(packet.sender);
            const receiverSocket = getSocket(receiver);
            if(receiverSocket)
                io.to([senderSocket.id, receiverSocket.id]).emit("chat_message", packet);
            else
                io.to(senderSocket.id).emit("get_notified", "This User has disconnected");
        }
    })
}

module.exports = { messagesDelivery };

/* { sender: sender._id,
     payload: {type: String,
               data: String},

     to: user._id }*/