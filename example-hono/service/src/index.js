import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";
import { serve } from "@hono/node-server";

const app = new Hono();

/**
 * Middleware
 */

// Middleware to set headers
app.use("*", async (c, next) => {
  // Enable CORS
  c.header("Access-Control-Allow-Origin", "*");
  c.header("Access-Control-Allow-Methods", "*");
  c.header("Access-Control-Allow-Headers", "*");
  c.header("x-powered-by", "serverless-container-framework");
  await next();
});

// Serve static files from the "public" directory
app.use(
  "/*",
  serveStatic({
    root: "src/public",
  })
);

/**
 * Routes
 */

// Robots.txt
app.get("/robots.txt", (c) => c.text("User-agent: *"));

// Options
app.options("*", (c) => c.status(200).body(""));

// Healthcheck
app.get(`/health`, (c) => c.text(`OK`));

// Default Route
app.get(`/*`, (c) =>
  c.html(`
    <html>
      <head>
        <title>Serverless Container Framework</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="/css/styles.css">
        <link rel="icon" type="image/png" href="/images/favicon.png">
      </head>
      <body>
        <div class="container">
          <img src="/images/logo.png" alt="Logo" class="logo">
          <div class="info">Namespace: ${
            process.env.SERVERLESS_CONTAINERS_NAMESPACE
          }</div>
          <div class="info">Container Name: ${
            process.env.SERVERLESS_CONTAINERS_CONTAINER_NAME
          }</div>
          <div class="info">Stage: ${
            process.env.SERVERLESS_CONTAINERS_STAGE
          }</div>
          <div class="info">Compute Type: ${
            process.env.SERVERLESS_CONTAINERS_COMPUTE_TYPE
          }</div>
          <div class="info">Local: ${
            process.env.SERVERLESS_CONTAINERS_LOCAL || "false"
          }</div>
        </div>
      </body>
    </html>
  `)
);

// Catch-all 404 Handler
app.notFound((c) =>
  c.html(
    `
    <html>
      <head>
        <title>404 - Page Not Found</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="/css/styles.css">
        <link rel="icon" type="image/png" href="/images/favicon.png">
      </head>
      <body>
        <div class="container">
          <h1>404 - Page Not Found</h1>
          <a href="/">Return to Home</a>
        </div>
      </body>
    </html>
  `,
    404
  )
);

/**
 * Error Handler
 */
app.onError((err, c) => {
  console.error(err);
  const status = err.status || 500;
  return c.json(
    {
      error: err.message || "Internal Server Error",
      message: err.message || "Internal Server Error",
      code: err.code || "internal_error",
      status: status,
      // stack: err.stack, // Don't include stack trace
    },
    status
  );
});

serve({ fetch: app.fetch, port: process.env.PORT || 8080 });
