/**
 * @file dev.js
 * @description Simplified script for development that builds the React application,
 * copies public assets into the build directory, and watches only the server.js file to 
 * restart the server on changes.
 */

import { build } from 'esbuild'
import { spawn } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'
import { promises as fs } from 'fs'
import chokidar from 'chokidar'
import esbuild from 'esbuild'

// Compute the project root directory using this file's location.
const __filename = fileURLToPath(import.meta.url)
const ROOT_DIR = path.dirname(__filename)
console.log(`Project root: ${ROOT_DIR}`)

// Define important paths.
const CLIENT_ENTRY = path.join(ROOT_DIR, 'src', 'index.jsx')
const BUILD_DIR = path.join(ROOT_DIR, 'build')
const BUNDLE_FILE = path.join(BUILD_DIR, 'bundle.js')
const PUBLIC_DIR = path.join(ROOT_DIR, 'public')
const SERVER_PATH = path.join(ROOT_DIR, 'server.js')

/**
 * Builds the React client using esbuild's new context API and enables watch mode.
 *
 * @param {Object} options - Options for building the client.
 * @param {string} options.entry - The entry file for the React application.
 * @returns {Promise<void>} Resolves when the client build and watch process is started.
 */
async function buildClient({ entry } = {}) {
  try {
    // Ensure the build directory exists.
    await fs.mkdir(BUILD_DIR, { recursive: true })

    // Create a build context using esbuild's context API.
    // IMPORTANT: This API is available only in esbuild v0.14+.
    const ctx = await esbuild.context({
      entryPoints: [entry],
      bundle: true,
      outfile: BUNDLE_FILE,
      loader: { '.js': 'jsx', '.jsx': 'jsx' },
      sourcemap: true,
      target: ['es2015'],
      minify: false, // No minification in development for easier debugging.
      define: {
        'process.env.NODE_ENV': '"development"',
      },
    })

    // Activate watch mode using the context API.
    // This tells esbuild to automatically rebuild when source files change.
    await ctx.watch()

    console.log('Initial client build succeeded and watching for changes.')
  } catch (error) {
    console.error('Error during client build:', error)
  }
}

/**
 * Recursively copies a directory from source to destination.
 *
 * @param {Object} options - Options for copying files.
 * @param {string} options.src - The source directory.
 * @param {string} options.dest - The destination directory.
 * @returns {Promise<void>} Resolves when the entire directory has been copied.
 */
async function copyDirectory({ src, dest } = {}) {
  await fs.mkdir(dest, { recursive: true })
  const entries = await fs.readdir(src, { withFileTypes: true })
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      await copyDirectory({ src: srcPath, dest: destPath })
    } else {
      await fs.copyFile(srcPath, destPath)
      console.log(`Copied file: ${srcPath} -> ${destPath}`)
    }
  }
}

/**
 * Starts the server process using the provided server file.
 *
 * @param {Object} options - Options for starting the server.
 * @param {string} options.serverPath - The absolute path to server.js.
 * @returns {import('child_process').ChildProcess} The spawned server process.
 */
function startServer({ serverPath } = {}) {
  console.log('Starting server process...')
  const serverProcess = spawn('node', [serverPath], {
    stdio: 'inherit',
    cwd: ROOT_DIR,
    env: { ...process.env, NODE_ENV: 'development' },
  })
  serverProcess.on('close', (code) => {
    console.log(`Server process exited with code ${code}`)
  })
  return serverProcess
}

/**
 * Sets up a file watcher for the server.js file. When changes are detected,
 * the provided callback function is invoked to restart the server.
 *
 * @param {Object} options - Options for the file watcher.
 * @param {string} options.serverPath - Path to the server script.
 * @param {Function} options.onChange - Callback function upon detecting changes.
 */
function watchServer({ serverPath, onChange } = {}) {
  const watcher = chokidar.watch(serverPath, {
    ignored: /node_modules/,
    ignoreInitial: true,
  })
  watcher.on('change', (filePath) => {
    console.log(`Detected change in ${filePath}. Restarting server...`)
    onChange()
  })
}

/**
 * Sets up a file watcher for the public directory. When changes are detected,
 * the file or directory is copied to the build directory.
 *
 * @param {Object} options - Options for the public folder watcher.
 * @param {string} options.publicDir - Path to the public directory.
 * @param {string} options.buildDir - Path to the build directory.
 */
function watchPublic({ publicDir, buildDir } = {}) {
  const watcher = chokidar.watch(publicDir, {
    ignored: /(^|[\/\\])\../, // Ignore dot files
    persistent: true,
    ignoreInitial: true,
  })

  watcher.on('all', async (event, filePath) => {
    try {
      // Get the relative path from public dir
      const relativePath = path.relative(publicDir, filePath)
      const destPath = path.join(buildDir, relativePath)

      console.log(`Detected ${event} in public folder: ${relativePath}`)

      switch (event) {
        case 'add':
        case 'change':
          // Ensure the destination directory exists
          await fs.mkdir(path.dirname(destPath), { recursive: true })
          await fs.copyFile(filePath, destPath)
          break
        case 'unlink':
          await fs.unlink(destPath)
          break
        case 'addDir':
          await fs.mkdir(destPath, { recursive: true })
          break
        case 'unlinkDir':
          await fs.rm(destPath, { recursive: true, force: true })
          break
      }
    } catch (error) {
      console.error(`Error handling public folder change:`, error)
    }
  })

  console.log(`Watching public folder: ${publicDir}`)
}

/**
 * Main function to run the development environment.
 * This function performs the following:
 * - Builds the client (React app) using esbuild.
 * - Copies the public folder (static assets, HTML, CSS, images) into the build directory.
 * - Starts the server process from server.js.
 * - Watches server.js for changes and restarts the server when changes are detected.
 * - Watches public folder for changes and copies updates to build directory.
 *
 * @returns {Promise<void>} Resolves once the development environment is running.
 */
async function runDev() {
  // Build the client and copy public assets into the build directory.
  await buildClient({ entry: CLIENT_ENTRY })
  await copyDirectory({ src: PUBLIC_DIR, dest: BUILD_DIR })

  // Spawn the server process.
  let serverProcess = startServer({ serverPath: SERVER_PATH })

  // Watch the server.js file for changes and restart on change.
  watchServer({
    serverPath: SERVER_PATH,
    onChange: () => {
      if (serverProcess) {
        serverProcess.kill()
        // Delay restart slightly to allow port release.
        setTimeout(() => {
          serverProcess = startServer({ serverPath: SERVER_PATH })
        }, 500)
      }
    },
  })

  // Watch the public folder for changes
  watchPublic({ publicDir: PUBLIC_DIR, buildDir: BUILD_DIR })

  console.log('Dev environment is active. Watching server.js and public folder for changes...')
}

runDev() 