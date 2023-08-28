import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://main--starlit-mochi-d0dbf9.netlify.app",
      "https://chatfront-z.vercel.app",
    ],
  },
});

let users = [];

// fuinctions
const addUser = (userID, socketId) => {
  if (!users.some((user) => user.userId === userID)) {
    users.push({ userID, socketId });
  }
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (receiverId) => {
  const r = users.find((user) => user.userID === receiverId);
  return r;
};

// after connecting to the socket

io.on("connection", (socket) => {
  console.log(" a user is connected");
  socket.on("addUser", (data) => {
    console.log(data);
    if (data !== null) {
      addUser(data, socket.id);
    }
    io.emit("getUsers", users);
  });

  //send n receive message

  socket.on("send-message", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    console.log(senderId, receiverId, text);
    io.to(user?.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("some one disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

io.listen(8000);
