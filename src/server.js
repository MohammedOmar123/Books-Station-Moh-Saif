const http = require('http');

const port = process.env.PORT || 3000;

const server = http.createServer((req , res) => {
    console.log(req)
    res.end('<h1>Request is done</h1>');
});

server.listen(port , () => console.log('Start listening'));