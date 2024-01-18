const { User } = require("../models/user");

const sockets = {};

const userLoginHandlers = (io, socket) => {
  socket.on("user_login", async (userData) => {
    /** user = {username: String, id: Number, isInPublic: boolean} */
    console.log("a user login")
    const userId = socket.user._id;
    const user = await User.findById(userId);
    user.status = userData.status;
    await user.save();

    socket.user.username = user.username.toLowerCase();

    /** add current socket to sockets, using user's name as its key */
    sockets[user.username] = socket;

    if (user.isInPublic) socket.join("#public");

    const users = await User.find({
      status: { $in: ["online", "idle", "busy"] },
    }).sort("name");
      
    io.to("#public").emit("all_users", users);
  });

  socket.on("disconnect", async () => {
    const userId = socket.user._id;
    /**For Notification */
    const disconnectedUser = await User.findByIdAndUpdate(
      userId,
      { status: "disconnected" },
      { new: true }
    );

    const users = await User.find({
      status: { $in: ["online", "idle", "busy"] },
    }).sort("name");

    if (!disconnectedUser)
      return;

    delete sockets[disconnectedUser.username];
    io.emit("all_users", users);
    console.log("a user disconnect");
  });
};

const updateUserHandlers = (io, socket) => {
    socket.on("update_status", async (status) => {
    const userId = socket.user._id;
    /**For Notification */
    const updatedUser = await User.findByIdAndUpdate(userId, { status }, { new: true });
      
    const users = await User.find({
      status: { $in: ["online", "idle", "busy"] },
    }).sort("name");
        
    io.emit("all_users", users);
  });
};

const getSocket = (username) => {
  return sockets[username];
};

module.exports = {
  userLoginHandlers,
  updateUserHandlers,
  getSocket,
};
