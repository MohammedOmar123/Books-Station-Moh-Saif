const http = require('http');

const router = require('./router');  

const port = process.env.PORT || 8080;

const server = http.createServer(router);

server.listen(port , () => console.log('Start listening ' + port));
// test