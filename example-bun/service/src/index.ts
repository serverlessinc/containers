const server = {
  port: 8080,
  fetch: async (req: Request) => {
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
              <div>Namespace: ${process.env.SERVERLESS_NAMESPACE}</div>
              <div>Container Name: ${process.env.SERVERLESS_CONTAINER_NAME}</div>
              <div>Stage: ${process.env.SERVERLESS_STAGE}</div>
              <div>Compute Type: ${process.env.SERVERLESS_COMPUTE_TYPE}</div>
              <div>Local: ${process.env.SERVERLESS_LOCAL}</div>
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

} as const;

console.log(`Server running at http://localhost:${server.port}`);
