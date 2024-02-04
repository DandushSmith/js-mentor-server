const initCodeBlockData = async () => {
  try {
    const count = await CodeBlock.countDocuments();
    if (count === 0) {
      await CodeBlock.insertMany(codeBlocks);
      console.log("Initial code blocks inserted into the database.");
    } else {
      console.log(
        "Code blocks already exist in the database. Skipping initialization."
      );
    }
  } catch (error) {
    console.error("Error inserting code blocks:", error);
    process.exit(1);
  }
};

const run = async () => {
  await initCodeBlockData();
};

run();
