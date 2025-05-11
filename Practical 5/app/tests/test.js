const request = require("supertest");
const server = require("../src/index");

describe("Node.js Demo App", () => {
  after((done) => {
    server.close(done);
  });

  it("should return welcome message", async () => {
    const res = await request(server).get("/");
    assert.equal(res.status, 200);
    assert.equal(res.text, "Hello from Node.js CI/CD Demo!");
  });

  it("should return health status", async () => {
    const res = await request(server).get("/health");
    assert.equal(res.status, 200);
    assert.deepEqual(res.body, { status: "healthy" });
  });
});
