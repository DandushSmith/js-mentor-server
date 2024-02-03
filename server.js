require("dotenv").config({
  path: `${__dirname}/.env`,
});
const {
  connectToMongo,
  initCodeBlockData,
  CodeBlock,
} = require("./config/mongo");
const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIO = require("socket.io");
const router = require("./router/router");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 4000;

connectToMongo();
initCodeBlockData();

app.use(cors());
app.use("/codeBlock", router);

const io = socketIO(server, {
  cors: {
    origin: [process.env.CLIENT_URL, process.env.CLIENT_URL2],
  },
});

io.on("connection", (socket) => {
  console.log(`Socket connection is running with ${socket.id}`);

  socket.on("join_room", (room) => {
    const participants = io.sockets.adapter.rooms.get(room);
    if (participants) {
      socket.emit("not_first_user");
    }
    socket.join(room);
  });

  socket.on("edit", async (title, code, room) => {
    try {
      const updatedCode = await CodeBlock.findOneAndUpdate(
        { title },
        { code },
        { new: true }
      );
      socket.broadcast.to(room).emit("edited", updatedCode.code);
    } catch (error) {
      console.error("Error updating code:", error);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
