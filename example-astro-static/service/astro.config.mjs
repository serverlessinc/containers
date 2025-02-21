import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'server',
  adapter: 'node',
  server: {
    port: 8080,
    host: true
  }
});
