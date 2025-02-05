/**
 * @fileoverview Main application file for the Express AI Streaming example.
 * Sets up middleware, routes, and error handling before starting the server.
 */

const express = require("express");
const path = require("path");
const cors = require("cors");
const { setupAIRoutes } = require("./routes/ai");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();
const port = process.env.PORT || 8080;

/**
 * Configure middleware
 */
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Routes
setupAIRoutes(app);

/**
 * Health check endpoint handler.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
function healthCheckHandler(req, res) {
  res.status(200).json({ status: "healthy" });
}

// Health check endpoint
app.get("/health", healthCheckHandler);

// Error handling
app.use(errorHandler);

/**
 * Starts the Express server on the specified port.
 *
 * @param {Object} config - Server configuration object.
 * @param {number} config.port - Port number on which to run the server.
 */
const startServer = ({ port: serverPort }) => {
  app.listen(serverPort, "0.0.0.0", () => {
    console.log(`Server running on port ${serverPort}`);
  });
};

startServer({ port });

module.exports = app; 