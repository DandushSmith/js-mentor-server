require("dotenv").config({
  path: `${__dirname}/.env`,
});
const { connectToMongo } = require("./config/mongo");
const express = require("express");
const http = require("http");
const cors = require("cors");
const router = require("./router/router");
const connectToSocket = require("./socket/socket");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use("/codeBlock", router);

const initServer = async () => {
  await connectToMongo();
  connectToSocket(server);
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

initServer();
