const path = require('path');
const fs = require('fs');
const { search } = require('../logic');

const handler = (res, endpoint) => {
    
    fs.readFile(path.join(__dirname, '..','/books.json'), (err, data) => {
        let value = endpoint.slice(endpoint.lastIndexOf('/') + 1)
        value = value.split('%20').join(' ')
        if (err) {
            res.writeHead(500, { 'Content-type': 'html/text' });
            res.write('<h1> Internal Server Error ! <h1>');
            res.end();
        } else {
            let filtered = search(data,value)
            res.writeHead(200, { 'Content-Type': 'application/json'});
            res.write(JSON.stringify(filtered));
            res.end();
        }
    })
}

module.exports = handler; 