const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello from Node.js CI/CD Demo!");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = server;
