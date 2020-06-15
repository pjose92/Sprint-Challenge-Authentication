const request = require("supertest");

const server = require("./server");

describe("GET /", () => {
    it("Should return 200 status code", () => {
        return request(server)
            .get("/")
            .then(response => {
                expect(response.status).toBe(200);
            })
    })

    test("should return {message: 'Server is working!'}", () => {
        return request(server)
            .get("/")
            .then(response => {
                expect(response.body).toEqual({message: "Server is working!"});
                expect(response.body.message).toBe("Server is working!");
            })
    })
})