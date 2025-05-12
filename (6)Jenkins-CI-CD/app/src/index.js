const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello from Node.js CI/CD Demo!");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

// Only start server if not in test environment
if (process.env.NODE_ENV !== "test") {
  const server = app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

  module.exports = { app, server };
} else {
  module.exports = { app };
}
