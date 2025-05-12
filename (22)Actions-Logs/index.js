const express = require("express");
const app = express();
const PORT = process.env.PORT || 0; // Use 0 to get random available port

app.get("/", (req, res) => {
  res.send("Hello from Demo Node.js App!"); // Note the exclamation mark
});

app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

// Export both app and server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${server.address().port}`);
});

module.exports = { app, server };
