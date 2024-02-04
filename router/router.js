const express = require("express");
const { CodeBlock } = require("../config/mongo");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const codeBlocks = await CodeBlock.find();
    res.send(codeBlocks);
  } catch (error) {
    console.error("Error fetching code blocks");
  }
});

module.exports = router;
