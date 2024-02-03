const mongoose = require("mongoose");

const codeBlockSchema = new mongoose.Schema({
    title: String,
    code: String
  });
  
  module.exports = codeBlockSchema