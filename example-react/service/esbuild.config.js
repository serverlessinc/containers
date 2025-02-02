import { build } from 'esbuild';
import { promises as fs } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

/**
 * Builds the React application using esbuild and copies all static assets
 * to the build directory for production.
 *
 * @param {Object} options - Build configuration options.
 * @param {string} options.entry - The entry file for the React application.
 * @returns {Promise<void>} Resolves when the build and copy operations are complete.
 */
async function buildApp({ entry = join(__dirname, 'src', 'index.jsx') } = {}) {
  try {
    // Ensure build directory exists
    await fs.mkdir(join(__dirname, 'build'), { recursive: true });

    // Build the JavaScript bundle for the React app
    await build({
      entryPoints: [entry],
      bundle: true,
      outfile: join(__dirname, 'build', 'bundle.js'),
      loader: { '.js': 'jsx', '.jsx': 'jsx' },
      sourcemap: false, // Disable sourcemaps for production
      target: ['es2015'],
      minify: true,
      define: {
        'process.env.NODE_ENV': '"production"'
      }
    });
    console.log('JavaScript bundle built successfully.');

    // Copy the entire public directory to build
    await copyPublicToBuild();
    console.log('Public assets copied to build directory.');
  } catch (error) {
    console.error('Build Error:', error);
    process.exit(1);
  }
}

/**
 * Copies all files from the public directory to the build directory.
 *
 * @returns {Promise<void>} Resolves when all files have been copied.
 */
async function copyPublicToBuild() {
  const publicDir = join(__dirname, 'public');
  const buildDir = join(__dirname, 'build');

  async function copyRecursive(src, dest) {
    const entries = await fs.readdir(src, { withFileTypes: true });
    await fs.mkdir(dest, { recursive: true });

    for (const entry of entries) {
      const srcPath = join(src, entry.name);
      const destPath = join(dest, entry.name);

      if (entry.isDirectory()) {
        await copyRecursive(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    }
  }

  await copyRecursive(publicDir, buildDir);
}

buildApp(); 