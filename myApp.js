let express = require('express');
let app = express();

const staticMiddleware = express.static(__dirname + '/public');

app.use(staticMiddleware);

app.get('/', (req, res) => {
    const indexFile = __dirname + '/views/index.html';
    res.sendFile(indexFile);
});

module.exports = app;
