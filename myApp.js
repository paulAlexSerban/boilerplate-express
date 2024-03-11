const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

/**
 * In the route app.get('/now', ...) chain a middleware function and the final handler.
 * In the middleware function you should add the current time to the request object in the req.time key.
 * You can use new Date().toString(). In the handler, respond with a JSON object, taking the structure {time: req.time}.
 *
 * Note: The test will not pass if you don’t chain the middleware.
 * If you mount the function somewhere else, the test will fail, even if the output result is correct.
 */
app.get('/now', getNow, getNowHandler);

/**
 * Serve the object {"message": "Hello json"} as a response, in JSON format, to GET requests to the /json route.
 * Then point your browser to your-app-url/json, you should see the message on the screen.
 */
app.get('/json', (req, res) => {
    res.json({ message: 'Hello json' });
});

/**
 * Build an echo server, mounted at the route GET /:word/echo.
 * Respond with a JSON object, taking the structure {echo: word}.
 * You can find the word to be repeated at req.params.word.
 * You can test your route from your browser's address bar, visiting some matching routes, e.g. your-app-rootpath/freecodecamp/echo.
 */
app.get('/:word/echo', (req, res) => {
    res.json({ echo: req.params.word });
});

/**
 * Build an API endpoint, mounted at GET /name. Respond with a JSON document, taking the structure { name: 'firstname lastname'}.
 * The first and last name parameters should be encoded in a query string e.g. ?first=firstname&last=lastname.
 *
 * Note: In the following exercise you are going to receive data from a POST request, at the same /name route path.
 * If you want, you can use the method app.route(path).get(handler).post(handler).
 * This syntax allows you to chain different verb handlers on the same path route. You can save a bit of typing, and have cleaner code.
 */

const getNameHandler = (req, res) => {
    const { first, last } = req.query;
    res.json({ name: `${first} ${last}` });
};

const postNameHandler = (req, res) => {
    const { first, last } = req.body;
    res.json({ name: `${first} ${last}` });
};
app.route('/name', bodyParser.urlencoded({ extended: false }))
    .get(getNameHandler)
    .post(postNameHandler);

/**
 * body-parser has already been installed and is in your project's package.json file.
 * require it at the top of the myApp.js file and store it in a variable named bodyParser.
 * The middleware to handle URL encoded data is returned by bodyParser.urlencoded({extended: false}).
 * Pass the function returned by the previous method call to app.use().
 * As usual, the middleware must be mounted before all the routes that depend on it.
 *
 * Note: extended is a configuration option that tells body-parser which parsing needs to be used.
 * When extended=false it uses the classic encoding querystring library.
 * When extended=true it uses qs library for parsing.
 *
 * When using extended=false, values can be only strings or arrays.
 * The object returned when using querystring does not prototypically inherit from the default JavaScript Object,
 * which means functions like hasOwnProperty, toString will not be available.
 * The extended version allows more data flexibility, but it is outmatched by JSON.
 */

/**
 * Mount a POST handler at the path /name.
 * It’s the same path as before. We have prepared a form in the html frontpage.
 * It will submit the same data of exercise 10 (Query string).
 * If the body-parser is configured correctly, you should find the parameters in the object req.body.
 * Have a look at the usual library example:
 *
 * route: POST '/library'
 * urlencoded_body: userId=546&bookId=6754
 * req.body: {userId: '546', bookId: '6754'}
 *
 * Respond with the same JSON object as before: {name: 'firstname lastname'}.
 * Test if your endpoint works using the html form we provided in the app frontpage.
 */

/**
 * Send the /views/index.html file as a response to GET requests to the / path.
 * If you view your live app, you should see a big HTML heading (and a form that we will use later…), with no style applied.
 *
 * Note: You can edit the solution of the previous challenge or create a new one.
 * If you create a new solution, keep in mind that Express evaluates routes from top to bottom, and executes the handler for the first match.
 * You have to comment out the preceding solution, or the server will keep responding with a string.
 */
app.get('/', (req, res) => {
    const indexFile = __dirname + '/views/index.html';
    res.sendFile(indexFile);
});

module.exports = app;
