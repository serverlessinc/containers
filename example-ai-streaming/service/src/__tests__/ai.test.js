const request = require("supertest");
const app = require("../index");

describe("AI Streaming API", () => {
  test("OpenAI streaming endpoint returns SSE response", async () => {
    const response = await request(app)
      .post("/api/chat")
      .send({
        provider: "openai",
        model: "gpt-4",
        messages: [{ role: "user", content: "Hello" }],
      });

    expect(response.headers["content-type"]).toMatch(/text\/event-stream/);
    expect(response.status).toBe(200);
  });

  test("Anthropic streaming endpoint returns SSE response", async () => {
    const response = await request(app)
      .post("/api/chat")
      .send({
        provider: "anthropic",
        model: "claude-3-5-sonnet-20241022",
        messages: [{ role: "user", content: "Hello" }],
      });

    expect(response.headers["content-type"]).toMatch(/text\/event-stream/);
    expect(response.status).toBe(200);
  });
});