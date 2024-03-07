let express = require('express');
let app = express();

app.get('/', (req, res) => {
    const indexFile = __dirname + '/views/index.html';
    res.sendFile(indexFile);
});

module.exports = app;
