import { Application, Router } from "https://deno.land/x/oak@v12.6.2/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";

const app = new Application();
const router = new Router();

// Enable CORS
app.use(oakCors());

// Add custom headers
app.use(async (ctx, next) => {
  ctx.response.headers.set("x-powered-by", "serverless-container-framework");
  await next();
});

// Health check
router.get("/health", (ctx) => {
  ctx.response.body = "OK";
});

// Robots.txt
router.get("/robots.txt", (ctx) => {
  ctx.response.type = "text/plain";
  ctx.response.body = "User-agent: *";
});

// Health check
router.get("/health", (ctx) => {
  ctx.response.body = "OK";
});

// Main route
router.get("/", (ctx) => {
  ctx.response.type = "text/html";
  ctx.response.body = `
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
          <div class="info">Namespace: ${Deno.env.get("SERVERLESS_NAMESPACE")}</div>
          <div class="info">Container Name: ${Deno.env.get("SERVERLESS_CONTAINER_NAME")}</div>
          <div class="info">Stage: ${Deno.env.get("SERVERLESS_STAGE")}</div>
          <div class="info">Compute Type: ${Deno.env.get("SERVERLESS_COMPUTE_TYPE")}</div>
          <div class="info">Local: ${Deno.env.get("SERVERLESS_LOCAL")}</div>
        </div>
      </body>
    </html>
  `;
});

// 404 handler
app.use((ctx) => {
  ctx.response.status = 404;
  ctx.response.type = "text/html";
  ctx.response.body = `
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
  `;
});

// Mount router
app.use(router.routes());
app.use(router.allowedMethods());

// Static files
app.use(async (ctx, next) => {
  try {
    await ctx.send({
      root: `${Deno.cwd()}/src/public`,
      index: "index.html",
    });
  } catch {
    await next();
  }
});

// Start server
const port = 8080;
console.log(`Server running at http://localhost:${port}`);
await app.listen({ port });
