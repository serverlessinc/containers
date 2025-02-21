/// <reference lib="dom" />

// Make this a module
export {};

declare global {
  const Bun: {
    serve(options: {
      port: number;
      fetch(req: Request): Response | Promise<Response>;
    }): { port: number };
    env: {
      SERVERLESS_NAMESPACE: string;
      SERVERLESS_CONTAINER_NAME: string;
      SERVERLESS_STAGE: string;
      SERVERLESS_COMPUTE_TYPE: string;
      SERVERLESS_LOCAL: string;
    };
  };
}

const server = Bun.serve({
  port: 8080,
  fetch(req) {
    const url = new URL(req.url);
    
    if (url.pathname === '/health') {
      return new Response('OK');
    }
    
    if (url.pathname === '/') {
      return new Response(`
        <html>
          <head>
            <title>Serverless Container Framework</title>
          </head>
          <body>
            <div>
              <div>Namespace: ${Bun.env.SERVERLESS_NAMESPACE}</div>
              <div>Container Name: ${Bun.env.SERVERLESS_CONTAINER_NAME}</div>
              <div>Stage: ${Bun.env.SERVERLESS_STAGE}</div>
              <div>Compute Type: ${Bun.env.SERVERLESS_COMPUTE_TYPE}</div>
              <div>Local: ${Bun.env.SERVERLESS_LOCAL}</div>
            </div>
          </body>
        </html>
      `, {
        headers: { 'Content-Type': 'text/html' }
      });
    }
    
    return new Response('Not Found', { status: 404 });
  }
});

console.log(`Server running at http://localhost:${server.port}`);
