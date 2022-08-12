const indexHandler = require('./handlers');
const publicHandler = require('./handlers/public');
const booksHandler = require('./handlers/books');
const notFoundHandler = require('./handlers/notFound');
const homeHandler = require('./handlers/home');

const router = (req, res) => {
    const endpoint = req.url;
    if (endpoint == '/') {
        indexHandler(res);
    } 
    else if(endpoint === '/home'){
        homeHandler(res);
    }
    else if (endpoint.includes('public')) {
        publicHandler(res, endpoint);
    } else if (endpoint.includes('books')) {
        booksHandler(res, endpoint);
    } else {
        notFoundHandler(res);
    }
}




module.exports = router; 