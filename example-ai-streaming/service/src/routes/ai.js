/**
 * @fileoverview Sets up a unified AI chat route for the Express application.
 * Streams AI responses using Server-Sent Events (SSE) from real providers.
 */

const OpenAI = require("openai");
const Anthropic = require("@anthropic-ai/sdk");
const { AIStreamingError } = require("../utils/errors");

/**
 * Configures the AI streaming route on the provided Express app instance.
 *
 * @param {Object} app - Express application instance.
 */
const setupAIRoutes = (app) => {
  // Initialize SDK clients for OpenAI and Anthropic using API keys from environment variables.
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  /**
   * Handles the POST /api/chat endpoint.
   * Streams AI chat completions from the specified provider.
   * Expects a JSON payload containing provider, model, and messages.
   *
   * Example payload:
   * {
   *   "provider": "openai",
   *   "model": "gpt-4",
   *   "messages": [{ "role": "user", "content": "Hello" }]
   * }
   *
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @param {Function} next - Next middleware function.
   */
  app.post("/api/chat", async (req, res, next) => {
    try {
      const { provider, model, messages } = req.body;
      if (!provider || !model || !messages) {
        res.status(400).json({ error: "Missing required fields: provider, model, or messages" });
        return;
      }

      // Set up Server-Sent Events (SSE) headers.
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      let stream;
      if (provider === "openai") {
        // Stream chat completions using OpenAI.
        stream = await openai.chat.completions.create({
          model,
          messages,
          stream: true,
        });
      } else if (provider === "anthropic") {
        // Stream messages using Anthropic.
        stream = await anthropic.messages.create({
          model,
          messages,
          stream: true,
          max_tokens: 1024,
        });
      } else {
        res.status(400).json({ error: "Invalid provider" });
        return;
      }

      // Stream the AI response data back to the client.
      for await (const chunk of stream) {
        let content = "";
        if (provider === "openai") {
          content = chunk.choices[0]?.delta?.content || "";
        } else if (provider === "anthropic") {
          content = chunk.delta?.text || "";
        }
        if (content) {
          res.write(`data: ${JSON.stringify({ content })}\n\n`);
        }
      }

      // Signal end of stream.
      res.write("data: [DONE]\n\n");
      res.end();
    } catch (error) {
      next(new AIStreamingError(`${req.body.provider} streaming failed`, error));
    }
  });
};

module.exports = { setupAIRoutes }; 