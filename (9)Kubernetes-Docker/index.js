const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kubernetes Node.js App</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        background-color: #f0f8ff;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        color: #333;
      }
      .container {
        text-align: center;
        background: white;
        padding: 2rem;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        max-width: 800px;
      }
      h1 {
        color: #2c5282;
      }
      .kubernetes-logo {
        width: 100px;
        margin-bottom: 1rem;
      }
      .features {
        text-align: left;
        margin: 1.5rem 0;
      }
      .status {
        color: #38a169;
        font-weight: bold;
      }
      .footer {
        margin-top: 2rem;
        font-size: 0.8rem;
        color: #718096;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <img src="https://kubernetes.io/images/favicon.png" alt="Kubernetes Logo" class="kubernetes-logo">
      <h1>Node.js App Running in Kubernetes</h1>
      <p>Welcome to this containerized Node.js application deployed on Kubernetes!</p>
      
      <div class="features">
        <h3>Features:</h3>
        <ul>
          <li>Containerized with Docker</li>
          <li>Deployed on Kubernetes</li>
          <li>Load balanced and scalable</li>
          <li>Health checks and monitoring</li>
        </ul>
      </div>
      
      <p class="status">Status: <span>🟢 Running</span></p>
      
      <div class="footer">
        <p>Container hostname: ${
          process.env.HOSTNAME || "Not running in Kubernetes"
        }</p>
        <p>Server time: ${new Date()}</p>
      </div>
    </div>
  </body>
  </html>
  `;
  res.send(html);
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.get("/metrics", (req, res) => {
  res.json({
    memoryUsage: process.memoryUsage(),
    cpuUsage: process.cpuUsage(),
    uptime: process.uptime(),
  });
});

app.use((req, res) => {
  res.status(404).send(`
    <h1>404 - Not Found</h1>
    <p>The page you requested doesn't exist.</p>
    <a href="/">Go back to home</a>
  `);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
