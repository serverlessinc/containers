import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'

const app = new Elysia()
  .use(cors())
  .get('/health', () => 'OK')
  .get('/robots.txt', () => 'User-agent: *')
  .get('/', () => `
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
          <div class="info">Namespace: ${process.env.SERVERLESS_NAMESPACE}</div>
          <div class="info">Container Name: ${process.env.SERVERLESS_CONTAINER_NAME}</div>
          <div class="info">Stage: ${process.env.SERVERLESS_STAGE}</div>
          <div class="info">Compute Type: ${process.env.SERVERLESS_COMPUTE_TYPE}</div>
          <div class="info">Local: ${process.env.SERVERLESS_LOCAL}</div>
        </div>
      </body>
    </html>
  `)
  .listen(8080)

console.log('Server running at http://localhost:8080')
