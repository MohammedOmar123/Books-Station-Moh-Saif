const path = require('path');
const fs = require('fs');
const handler = (res, endpoint) => {
    fs.readFile(path.join(__dirname, '../books.json'), (err, data) => {
        let value = endpoint.slice(endpoint.lastIndexOf('/') + 1)
        value = value.split('%20').join(' ')
        if (err) {
            res.writeHead(500, { 'Content-type': 'html/text' });
            res.write('<h1> Internal Server Error ! <h1>');
            res.end();
        } else {
            let counter = 0;
            let filtered = JSON.parse(data).filter((ele) => {
                if (value != '' && ele.bookName.toLowerCase().includes(value.toLowerCase()) && counter <= 10) {
                    counter++;
                    return true
                }
            })
            res.writeHead(200, 'application/json');
            res.write(JSON.stringify(filtered));
            res.end();
        }
    })
}

module.exports = handler; 