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

// TODO: remove???
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const codeBlocks = await CodeBlock.findById(id);
    res.send(codeBlocks);
  } catch (error) {
    console.error("Error fetching code blocks");
  }
});

module.exports = router;
