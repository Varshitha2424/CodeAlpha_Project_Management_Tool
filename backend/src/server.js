import dotenv from 'dotenv';
import http from 'http';
import app from './app.js';
import { configureSocket, initSocketServer } from './sockets/socket.server.js';
import listEndpoints from 'express-list-endpoints';

dotenv.config();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

configureSocket(server);
initSocketServer(server);

server.listen(PORT, () => {
  console.log(`\n✨ Backend API running on http://localhost:${PORT}\n`);
  
  // List all registered routes
  console.log('📋 Registered API Endpoints:\n');
  const endpoints = listEndpoints(app);
  const sortedEndpoints = endpoints.sort((a, b) => a.path.localeCompare(b.path));
  
  sortedEndpoints.forEach((endpoint) => {
    const methods = endpoint.methods
      .filter(m => m !== 'HEAD')
      .map(m => m.toUpperCase())
      .join(', ');

    let displayPath = endpoint.path;
    // Normalize RegExp paths to readable strings when express-list-endpoints exposes them as RegExp
    try {
      if (displayPath instanceof RegExp) {
        let p = displayPath.source || displayPath.toString();
        // Remove anchors
        p = p.replace(/^\^/, '').replace(/\$$/, '');
        // Replace non-capturing slashes and escaped slashes with '/'
        p = p.replace(/\(\?:\\\/)\)/g, '/');
        p = p.replace(/\\\//g, '/');
        // Remove common lookaheads used by Express route regex
        p = p.replace(/\(\?=\\\/\|\$\)/g, '');
        // Strip remaining regex tokens
        p = p.replace(/[^\/A-Za-z0-9:_-]/g, '');
        if (!p.startsWith('/')) p = '/' + p;
        displayPath = p;
      }
    } catch (e) {
      displayPath = String(endpoint.path);
    }

    console.log(`   ${methods.padEnd(10)} ${displayPath}`);
  });
  console.log('');
});