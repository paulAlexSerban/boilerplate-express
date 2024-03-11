let express = require('express');
let app = express();

const staticMiddleware = express.static(__dirname + '/public');

const requestLogger = (req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
};

app.use(requestLogger);

app.use('/public', staticMiddleware);

app.get('/json', (req, res) => {
    res.json({ "message": "Hello json" });
});

app.get('/', (req, res) => {
    const indexFile = __dirname + '/views/index.html';
    res.sendFile(indexFile);
});

module.exports = app;
