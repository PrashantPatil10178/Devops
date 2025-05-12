const request = require("supertest");
const assert = require("assert");
const app = require("../src/index").app; // Import the app instead of server

describe("Node.js Demo App", () => {
  it("should return welcome message", async () => {
    const res = await request(app).get("/");
    assert.equal(res.status, 200);
    assert.equal(res.text, "Hello from Node.js CI/CD Demo!");
  });

  it("should return health status", async () => {
    const res = await request(app).get("/health");
    assert.equal(res.status, 200);
    assert.deepEqual(res.body, { status: "healthy" });
  });
});
