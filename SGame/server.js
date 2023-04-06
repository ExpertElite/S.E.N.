const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url);
  const { message } = querystring.parse(query);

  if (pathname === '/messages' && req.method === 'POST') {
    // Append message to the chat_history.txt file
    fs.appendFileSync('./chat_history.txt', message + '\n');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Message sent successfully');
  } else if (pathname === '/messages' && req.method === 'GET') {
    // Read chat_history.txt file and send its contents as response
    const messages = fs.readFileSync('./chat_history.txt', 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(messages);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
