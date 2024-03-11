let express = require('express');
let app = express();

const staticMiddleware = express.static(__dirname + '/public');

const requestLogger = (req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
};

// log all requests with middleware
app.use(requestLogger);

// serve static files
app.use('/public', staticMiddleware);

const getNow = (req, res, next) => {
    req.time = new Date().toString();
    next();
};

const getNowHandler = (req, res) => {
    res.json({ time: req.time });
};

// simple time response with middleware to get the current time
app.get('/now', getNow, getNowHandler);

// simple json response
app.get('/json', (req, res) => {
    res.json({ message: 'Hello json' });
});
// simple echo server
app.get('/:word/echo', (req, res) => {
    res.json({ echo: req.params.word });
});

// simple index.html response
app.get('/', (req, res) => {
    const indexFile = __dirname + '/views/index.html';
    res.sendFile(indexFile);
});

module.exports = app;
