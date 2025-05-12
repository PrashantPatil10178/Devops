const request = require("supertest");
const { app, server } = require("../index");

describe("Demo App", () => {
  afterAll((done) => {
    server.close(done);
  });

  it("should return hello message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe("Hello from Demo Node.js App!");
  });

  it("health check should return healthy", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe("healthy");
  });
});
