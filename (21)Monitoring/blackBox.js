// blackBoxMonitoring.js
const axios = require("axios");
const client = require("prom-client");
const registry = new client.Registry();

// Black box metrics
const probeSuccessGauge = new client.Gauge({
  name: "blackbox_probe_success",
  help: "Indicates if the probe was successful",
  labelNames: ["endpoint"],
});

const probeDurationGauge = new client.Gauge({
  name: "blackbox_probe_duration_seconds",
  help: "How long the probe took to complete",
  labelNames: ["endpoint"],
});

registry.registerMetric(probeSuccessGauge);
registry.registerMetric(probeDurationGauge);

// Endpoints to probe
const endpoints = [
  { url: "http://localhost:3000", name: "homepage" },
  { url: "http://localhost:3000/unstable", name: "unstable" },
  { url: "http://localhost:3000/slow", name: "slow" },
  { url: "http://localhost:3000/nonexistent", name: "404" },
];

// Probe function
async function probeEndpoint(endpoint) {
  const start = Date.now();
  let success = 0;
  let statusCode = 0;

  try {
    const response = await axios.get(endpoint.url);
    statusCode = response.status;
    success = statusCode >= 200 && statusCode < 400 ? 1 : 0;
  } catch (error) {
    statusCode = error.response?.status || 0;
    success = 0;
  }

  const duration = (Date.now() - start) / 1000;

  probeSuccessGauge.labels(endpoint.name).set(success);
  probeDurationGauge.labels(endpoint.name).set(duration);

  console.log(
    `Probe ${endpoint.name}: ${
      success ? "SUCCESS" : "FAILED"
    }, Status: ${statusCode}, Duration: ${duration.toFixed(2)}s`
  );
}

// Regular probing
setInterval(() => {
  console.log("\nRunning black-box probes...");
  endpoints.forEach(probeEndpoint);
}, 10000); // Probe every 10 seconds

// Expose metrics
const express = require("express");
const metricsApp = express();
const metricsPort = 3001;

metricsApp.get("/metrics", async (req, res) => {
  res.set("Content-Type", registry.contentType);
  res.end(await registry.metrics());
});

metricsApp.listen(metricsPort, () => {
  console.log(`Black-box metrics server running on port ${metricsPort}`);
});
