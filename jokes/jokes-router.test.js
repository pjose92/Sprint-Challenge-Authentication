const request = require("supertest");
const server = require("../api/server.js");

describe("jokes-router", () => {
  describe("GET /api/jokes", () => {
    it("should responds with 401 without sending token", () => {
      return (
        request(server)
          .get("/api/jokes")
          .then(res => {
            expect(res.status).toBe(401);
          })
      );
    });

    it("should responds with JSON", () => {
      return (
        request(server)
          .get("/api/jokes")
          .then(res => {
            expect(res.type).toBe("application/json");
          })
      );
    });
  });
});