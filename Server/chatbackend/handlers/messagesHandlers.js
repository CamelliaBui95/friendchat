const {  getSocket } = require("./userHandlers");

const messagesDelivery = (io, socket) => {  
    socket.on("chat_message", packet => {
        
        const receiver = packet.to;
        if(receiver === "#public")
            io.to(receiver).emit("chat_message", packet);
        else {
            const senderSocketID = getSocket(packet.sender).id;
            const receiverSocketID = getSocket(receiver).id;
            io.to([senderSocketID, receiverSocketID]).emit("chat_message", packet);
        }
    })
}

module.exports = { messagesDelivery };

/* { sender: sender._id,
     payload: {type: String,
               data: String},

     to: user._id }*/