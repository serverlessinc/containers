import http from 'http';
import { promises as fs } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Define MIME types for different file extensions
const contentTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// Validate environment
if (!['development', 'production'].includes(NODE_ENV)) {
  console.error('Error: NODE_ENV must be either "development" or "production"');
  process.exit(1);
}

if (NODE_ENV !== 'production') {
  console.warn(`Warning: Running in ${NODE_ENV} mode`);
}

/**
 * Creates and returns an HTTP server that serves static files (built React app)
 * from the build directory.
 *
 * @param {Object} options - Server configuration options.
 * @param {number} options.port - Port number to listen on.
 * @returns {http.Server} HTTP server instance.
 */
const createServer = async ({ port = PORT } = {}) => {
  const server = http.createServer(async (req, res) => {
    try {
      // Normalize the file path
      const filePath = join(__dirname, "build", req.url === "/" ? "index.html" : req.url);
      const ext = extname(filePath);

      // If the request is for a static file (has extension), try to serve it directly
      if (ext) {
        try {
          const content = await fs.readFile(filePath);
          const contentType = contentTypes[ext] || 'text/html';
          res.writeHead(200, { 'Content-Type': contentType });
          return res.end(content, 'utf-8');
        } catch (error) {
          if (error.code === 'ENOENT') {
            // Static file not found, fall through to serve index.html
          } else {
            throw error;
          }
        }
      }

      // For all other routes, serve index.html for client-side routing
      const content = await fs.readFile(join(__dirname, 'build', 'index.html'));
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content, 'utf-8');

    } catch (error) {
      // Enhanced error logging
      console.error('Server Error Details:', {
        message: error.message,
        code: error.code,
        path: req.url,
        stack: error.stack
      });
      
      // Send more detailed error response
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(`Server Error: ${error.message}`);
    }
  });

  return server;
};

// Create and start the server
const server = await createServer();
server.listen(PORT, () => {
  console.log(`Server running in ${NODE_ENV} mode`);
});

export default createServer;
