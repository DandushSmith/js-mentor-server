const mongoose = require("mongoose");
const codeBlockSchema = require("../schema/codeBlock");
const codeBlocks = require("../utils/codeBlockList");
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

const initCodeBlockData = async () => {
  try {
    const count = await CodeBlock.countDocuments();
    if (count === 0) {
      await CodeBlock.insertMany(codeBlocks);
      console.log('Initial code blocks inserted into the database.');
    } else {
      console.log('Code blocks already exist in the database. Skipping initialization.');
    }
  } catch (error) {
    console.error("Error inserting code blocks:", error);
    process.exit(1); 
  }
};

module.exports = {connectToMongo, initCodeBlockData, CodeBlock};
