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

/*const roomServicesHandler = (io, socket) => {  
    socket.on("set_private_room", async request => {
        /**request = {sender, to} 

        const receiverId = request.to;
        const roomId = socket.data.userId + receiverId;
        const toSocket = getSocket(receiverId);
        if (!toSocket)
            throw new Error("User Not Exist");

        socket.join(roomId);
        toSocket.join(roomId);

        io.to(roomId).emit("set_private_room", {
          sender: getUser(socket.data.username),
          to: getUser(toSocket.data.username),
          roomId,
        });
        
    })  
}*/

module.exports = { messagesDelivery };

/* { sender: user.username,
     payload: {type: String,
               data: String},

     to: "#public" }*/