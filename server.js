const http = require('http');
const fs = require('fs');
const path = require('path');

function doOnRequest(request, response){
  // Send back a message saying "Welcome to Twitter"
  // code here...
  // response.end("yo")  
  if (request.method === 'GET' && request.url === '/') {
    // read the index.html file and send it back to the client
    // code here...

    response.end(fs.readFileSync(path.join(__dirname, 'index.html')));

    // fs.createReadStream(path.join(__dirname, 'index.html')).pipe(response);

  }
  else if (request.method === 'POST' && request.url === '/sayHi') {
    // code here...

    fs.appendFileSync(path.join(__dirname, 'hi_log.txt'), 'Somebody said hi.\n');
    response.end("hi back to you!")  
  }
  else if (request.method === 'POST' && request.url === '/greeting') {
    // accumulate the request body in a series of chunks
    // code here...

    let body = '';

    request.on('data', (chunk) => { body += String(chunk); });

    // when the request has finished being sent, send back a modified message

    request.on('end', () => {
      switch (body) {
        case 'hello':
          response.end('hello there!');
        break;
        case 'what\'s up':
          response.end('the sky');
        break;
        default:
          response.end('good morning');
      }
    });
  }
  else {
    // Handle 404 error: page not found
    // code here...
    
  }
}

const server = http.createServer(doOnRequest)

server.listen(3000);
