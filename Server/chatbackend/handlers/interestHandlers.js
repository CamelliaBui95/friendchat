const { Category, Interest } = require("../models/interest");

const interestCategoryHandlers = (io, socket) => {
  socket.on("get_categories", async () => {
    const categories = await Category.find({}).sort("label");
    io.to(socket.id).emit("get_categories", categories);
  });
};

const interestHandlers = (io, socket) => {
  socket.on("get_interests_by_category", async (categoryID) => {
    const interests = await Interest.find({
      category: categoryID,
    }).sort("name");

    io.to(socket.id).emit("get_interests_by_category", interests);
  });
};

module.exports = {
  interestCategoryHandlers,
  interestHandlers,
};
