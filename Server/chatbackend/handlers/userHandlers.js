const { User } = require("../models/user");

const sockets = {};

const userLoginHandlers = (io, socket) => {
  socket.on("user_login", async (userData) => {
    /** user = {username: String, id: Number, isInPublic: boolean} */
    console.log("a user login");
    const userId = socket.user._id;
    const user = await User.findById(userId);
    user.status = userData.status;
    await user.save();

    socket.user.username = user.username.toLowerCase();

    /** add current socket to sockets, using user's name as its key */
    sockets[userId] = socket;

    if (user.isInPublic) socket.join("#public");

    const users = await User.find(
      {
        status: { $in: ["online", "idle", "busy"] },
      },
      { password: 0 }
    ).sort("name");

    io.to(socket.id).emit("all_users", users);
    io.emit("update_user_list", user);
  });

  socket.on("disconnect", async () => {
    const userId = socket.user._id;
    /**For Notification */
    const disconnectedUser = await User.findByIdAndUpdate(
      userId,
      { status: "disconnected" },
      { new: true }
    );

    /*const users = await User.find({
      status: { $in: ["online", "idle", "busy"] },
    }).sort("name");*/

    if (!disconnectedUser) return;

    delete sockets[disconnectedUser._id];

    //io.emit("all_users", users);
    io.emit("update_user_list", disconnectedUser);

    console.log("a user disconnect");
  });
};

const updateUserHandlers = (io, socket) => {
  socket.on("update_status", async (status) => {
    const userId = socket.user._id;
    /**For Notification */
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { status },
      { new: true }
    );

    const users = await User.find({
      status: { $in: ["online", "idle", "busy"] },
    }).sort("name");

    //io.emit("all_users", users);
    io.emit("update_user_list", updatedUser);
  });
};

const userProfileHandlers = (io, socket) => {
  socket.on("get_user_profile", async (userId) => {
    const user = await User.findById(userId).populate("profile.interests");

    io.emit("get_user_profile", user);
  });

  socket.on("update_user_profile", async ({ userId, profile }) => {
    await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          username: profile.username,
          "profile.description": profile.description,
          "profile.imgUrl": profile.imgUrl,
          "profile.interests": profile.interests,
        },
      },
      { new: true }
    )
      .populate("profile.interests")
      .then((result) => {
        io.to(socket.id).emit("get_user_profile", result);
        io.emit("update_user_list", result);
      });
  });
};

const getSocket = (id) => {
  return sockets[id];
};

module.exports = {
  userLoginHandlers,
  updateUserHandlers,
  userProfileHandlers,
  getSocket,
};
