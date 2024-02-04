const socketIO = require("socket.io");
const { CodeBlock } = require("../config/mongo");

const connectToSocket = (server) => {
  const io = socketIO(server, {
    cors: {
      //TODO: check cors
      origin: [process.env.CLIENT_URL],
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
};

module.exports = connectToSocket;
