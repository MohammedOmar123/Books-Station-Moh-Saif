const path = require('path');
const fs = require('fs');

const mime = require('mime-types');

const handler = (res, endpoint) => {
    const filePath = path.join(__dirname, '..','..', endpoint);
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.write('<h1>Internal Server Error ! <h1> ')
            res.end();
        } else {
            res.writeHead(200, { 'Content-Type': mime.lookup(endpoint) });
            res.write(data)
            res.end();
        }
    })
}

module.exports = handler;