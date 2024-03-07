let express = require('express');
let app = express();

const staticMiddleware = express.static(__dirname + '/public');

app.use('/public', staticMiddleware);

app.get('/', (req, res) => {
    const indexFile = __dirname + '/views/index.html';
    res.sendFile(indexFile);
});

app.get('/json', (req, res) => {
  res.json({
    message: "Hello json"
  });
});

module.exports = app;
