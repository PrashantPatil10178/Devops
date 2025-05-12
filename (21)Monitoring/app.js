// app.js
const express = require("express");
const app = express();
const port = 3000;

// Sample route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Route that might fail
app.get("/unstable", (req, res) => {
  if (Math.random() > 0.5) {
    res.status(500).send("Internal Server Error");
  } else {
    res.send("Lucky you!");
  }
});

// Route with delay
app.get("/slow", async (req, res) => {
  const delay = Math.random() * 5000; // Up to 5 seconds
  await new Promise((resolve) => setTimeout(resolve, delay));
  res.send(`Delayed by ${delay}ms`);
});

// Export the app instead of starting the server here
module.exports = app;

// Only start server if run directly
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Sample app listening at http://localhost:${port}`);
  });
}
