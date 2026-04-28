const request = require("supertest");
const { expect } = require("chai");

const BASE_URL = "http://localhost:3000";

describe("Path Coverage - Stareast Commerce API", () => {
  it("POST /register should register a new user", async () => {
    const uniqueEmail = `dave.${Date.now()}@example.com`;

    const response = await request(BASE_URL).post("/register").send({
      name: "Dave",
      email: uniqueEmail,
      password: "dave123"
    });

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property("message");
  });

  it("POST /login should return a JWT token", async () => {
    const response = await request(BASE_URL).post("/login").send({
      email: "alice@example.com",
      password: "alice123"
    });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("token");
    expect(response.body.token).to.be.a("string").and.not.empty;
  });

  it("POST /checkout should complete order for authenticated user", async () => {
    const loginResponse = await request(BASE_URL).post("/login").send({
      email: "alice@example.com",
      password: "alice123"
    });

    expect(loginResponse.status).to.equal(200);
    const token = loginResponse.body.token;

    const response = await request(BASE_URL)
      .post("/checkout")
      .set("Authorization", `Bearer ${token}`)
      .send({
        productId: 1,
        quantity: 1,
        paymentMethod: "cash"
      });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("message");
  });

  it("GET /healthcheck should report API health", async () => {
    const response = await request(BASE_URL).get("/healthcheck");

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("status");
  });
});
