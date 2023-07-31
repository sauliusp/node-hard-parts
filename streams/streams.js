const fs = require('fs');
const path = require('path');
const through = require('through2');

// Create a read stream here
const readPoemStream = fs.createReadStream(path.join(__dirname, 'on-joy-and-sorrow-emoji.txt'));

readPoemStream.on('data', (chunk) => { 
    console.log(chunk.toString().replace(':)', 'joy').replace(':(', 'sorrow')); 
});

// Create a write stream here
const writePoemStream = fs.createWriteStream(path.join(__dirname, 'on-joy-and-sorrow-fixed.txt'));

const transformStream = through(function(chunk, encoding, callback) {
    this.push(chunk.toString().replace(':)', 'joy').replace(':(', 'sorrow'));

    callback();
});

readPoemStream.pipe(transformStream).pipe(writePoemStream);

/* EXTENSION: Create a transform stream (modify the read stream before piping to write stream)
const transformStream = ???
readPoemStream.pipe(transformStream).pipe(writePoemStream)
*/