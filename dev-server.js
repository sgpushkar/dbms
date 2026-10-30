const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8'
};

// Live reload SSE clients
const reloadClients = new Set();

// Watch directories for changes
let reloadTimeout = null;
function triggerReload(filename) {
  if (reloadTimeout) clearTimeout(reloadTimeout);
  reloadTimeout = setTimeout(() => {
    console.log(`[dev-server] File change detected (${filename}), reloading browser...`);
    for (const res of reloadClients) {
      try {
        res.write('data: reload\n\n');
      } catch (e) {
        reloadClients.delete(res);
      }
    }
  }, 100);
}

// Watch assets and html
const watchDirs = [ROOT_DIR, path.join(ROOT_DIR, 'assets'), path.join(ROOT_DIR, 'assets', 'css'), path.join(ROOT_DIR, 'assets', 'js')];
watchDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    try {
      fs.watch(dir, { recursive: false }, (eventType, filename) => {
        if (filename && !filename.startsWith('.') && !filename.includes('node_modules')) {
          triggerReload(filename);
        }
      });
    } catch (e) {
      // ignore watch errors on subdirs
    }
  }
});

const server = http.createServer((req, res) => {
  // Live reload SSE endpoint
  if (req.url === '/__livereload') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });
    res.write('\n');
    reloadClients.add(res);
    req.on('close', () => reloadClients.delete(res));
    return;
  }

  // Parse path
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  const filePath = path.join(ROOT_DIR, reqPath);

  // Security check to avoid directory traversal
  if (!filePath.startsWith(ROOT_DIR)) {
    res.writeHead(403);
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`<h1>404 Not Found</h1><p>The requested file <code>${reqPath}</code> was not found.</p>`);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // If HTML, inject live reload script
    if (ext === '.html') {
      fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) {
          res.writeHead(500);
          res.end('500 Server Error');
          return;
        }

        const liveReloadScript = `
<!-- Dev Server Live Reload -->
<script>
  (function() {
    if (window.location.protocol.startsWith('http')) {
      const source = new EventSource('/__livereload');
      source.onmessage = function(e) {
        if (e.data === 'reload') {
          console.log('[live-reload] Reloading page...');
          window.location.reload();
        }
      };
      source.onerror = function() {
        setTimeout(() => new EventSource('/__livereload'), 2000);
      };
    }
  })();
</script>
</body>`;

        const modifiedContent = content.replace('</body>', liveReloadScript);
        res.writeHead(200, {
          'Content-Type': contentType,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Content-Length': Buffer.byteLength(modifiedContent)
        });
        res.end(modifiedContent);
      });
      return;
    }

    // Stream other files
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Content-Length': stats.size
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

function startServer(port) {
  server.listen(port, () => {
    const url = `http://localhost:${port}`;
    console.log(`\n==================================================`);
    console.log(`🚀 DBMS Lab Portal Dev Server Running!`);
    console.log(`--------------------------------------------------`);
    console.log(`> Local:   ${url}`);
    console.log(`> Mode:    Development (Live Reload Active)`);
    console.log(`> Press Ctrl+C to stop`);
    console.log(`==================================================\n`);

    // Auto open browser
    const startCmd = process.platform === 'win32' ? `start "" "${url}"` : (process.platform === 'darwin' ? `open "${url}"` : `xdg-open "${url}"`);
    exec(startCmd, (err) => {
      // Ignore if user environment does not support auto-launching
    });
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is in use, trying ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });
}

startServer(PORT);

