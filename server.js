const http = require('http');
const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'hi_log.txt');
const styleFile = path.join(__dirname, 'style.css');
const largeFile = path.join(__dirname, 'large.txt');

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
  else if (request.method === 'GET' && request.url === '/largeTxtFast') {
    
    const readStream = fs.createReadStream(largeFile);

    response.writeHead(200, { 'Content-Type': 'text/plain' });

    // readStream.on('data', (chunk) => {
    //   console.log(String(chunk))

    //   response.write(String(chunk));
    // });

    // readStream.on('end', () => {
    //   response.end();
    // })

    readStream.pipe(response);
  }
  else if (request.method === 'GET' && request.url === '/largeTxtSlow') {
    
    const readStream = fs.createReadStream(largeFile);

    response.writeHead(200, { 'Content-Type': 'text/plain' });

    response.end(fs.readFileSync(largeFile)); 
  }
  else if (request.method === 'GET' && request.url === '/style.css') {
    response.end(fs.readFileSync(styleFile));
  }
  else if (request.method === 'POST' && request.url === '/sayHi') {
    // code here...

    fs.appendFileSync(logFile, 'Somebody said hi.\n');
    response.end("hi back to you!")  
  }
  else if (request.method === 'POST' && request.url === '/greeting') {
    // accumulate the request body in a series of chunks
    // code here...

    let body = '';

    request.on('data', (chunk) => { 
      const payload = String(chunk);

      body += payload; 

      fs.appendFileSync(logFile, payload + '\n');
    });

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
    response.statusCode = 404;
    response.end("Error: page not found")
    
  }
}

const server = http.createServer(doOnRequest)

server.on('clientError', (err, socket) => {
  console.error(err);
});

server.listen(3000);
