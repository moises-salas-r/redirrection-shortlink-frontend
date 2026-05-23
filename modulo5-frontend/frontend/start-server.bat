@echo off
echo Iniciando servidor HTTP local...
echo El frontend estará disponible en: http://localhost:8080
echo Presiona Ctrl+C para detener el servidor
echo.

node -e "const http = require('http'); const fs = require('fs'); const path = require('path'); const mimeTypes = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript' }; const server = http.createServer((req, res) => { let filePath = '.' + (req.url === '/' ? '/index.html' : req.url); const extname = String(path.extname(filePath)).toLowerCase(); const contentType = mimeTypes[extname] || 'application/octet-stream'; fs.readFile(filePath, (error, content) => { if (error) { if (error.code == 'ENOENT') { res.writeHead(404); res.end('File not found'); } else { res.writeHead(500); res.end('Server error: ' + error.code); } } else { res.writeHead(200, { 'Content-Type': contentType }); res.end(content, 'utf-8'); } }); }); server.listen(8080, () => { console.log('Servidor corriendo en http://localhost:8080'); });"
