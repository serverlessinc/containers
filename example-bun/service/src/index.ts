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
      return new Response('OK', {
        headers: { 'Content-Type': 'text/plain' }
      });
    }
    
    if (url.pathname === '/') {
      return Response.json({
        namespace: Bun.env.SERVERLESS_NAMESPACE,
        container_name: Bun.env.SERVERLESS_CONTAINER_NAME,
        stage: Bun.env.SERVERLESS_STAGE,
        compute_type: Bun.env.SERVERLESS_COMPUTE_TYPE,
        local: Bun.env.SERVERLESS_LOCAL
      });
    }
    
    return new Response('Not Found', { status: 404 });
  }
});

console.log(`Server running at http://localhost:${server.port}`);
