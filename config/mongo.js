const mongoose = require("mongoose");
const codeBlockSchema = require("../schema/codeBlock");
require("dotenv").config({
  path: `${__dirname}/.env`,
});
const DB_URL = process.env.DB_URL;

const CodeBlock = mongoose.model("CodeBlock", codeBlockSchema);

const connectToMongo = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

module.exports = { connectToMongo, CodeBlock };
