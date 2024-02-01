const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const mongoose = require('mongoose');
const config = require("config");
const jwt = require("jsonwebtoken");
const user = require('./routes/user');
const auth = require('./routes/auth');
const appRoute = require("./routes/appRoute");
//const { getSslConfigObj } = require("./utils/utils");
const { userLoginHandlers, updateUserHandlers, userProfileHandlers } = require("./handlers/userHandlers");
const { messagesDelivery } = require('./handlers/messagesHandlers');
const { interestCategoryHandlers, interestHandlers } = require("./handlers/interestHandlers");
const { init } = require('./init');

if (!config.get("jwtPrivateKey")) {
  console.error("Error: jwtPrivateKey is not defined.");
  process.exit(1);
}

mongoose
  .connect("mongodb://127.0.0.1:27017/friendChat", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

/*const server = https.createServer(
  getSslConfigObj(__dirname),
  app
);*/

try {
  init();
} catch (err) {
  console.log(err);
}

const io = new Server(server, { cors: { origin: '*' } });

const corsOptions = {
  exposedHeaders: "x-auth-token",
};

app.use(express.json());
app.use(cors(corsOptions));
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/app', appRoute);

/**Auth Middleware*/
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    next(new Error("Access Denied. No Token Provided"));
  };

  let decoded;
  try {
    decoded = jwt.verify(token, config.get("jwtPrivateKey"));
  } catch (error) {
    next(new Error("Access Denied. Invalid Token"));
  }

  if (!decoded.isAuthorized)
    next(new Error("Access is Denied."));

  socket.user = { _id: decoded._id }
  next();
});

io.on('connection', socket => {
  io.to(socket.id).emit("socket_connected");

  userLoginHandlers(io, socket);
  updateUserHandlers(io, socket);
  userProfileHandlers(io, socket);
  messagesDelivery(io, socket);
  interestCategoryHandlers(io, socket);
  interestHandlers(io, socket);

});

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

