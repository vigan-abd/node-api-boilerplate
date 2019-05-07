const express = require('express');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const HttpsMiddleware = require('./src/middlewares/HttpsMiddleware');
const CorsMiddleware = require('./src/middlewares/CorsMiddleware');


// APP SETUP
const app = express();
const config = require('./src/config');
const container = require('./src/containers/web');
const routes = require('./src/routes');

// SECURITY CONFIG
app.set('trust proxy', 1);
app.use(CorsMiddleware);

// REQUEST CONFIG
app.set('json spaces', 2);
app.use(cookieParser());
app.use(bodyParser.json({type: 'application/json', limit: config.REQ_PAYLOAD_LIMIT}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if(config.APP_ENV === 'production') {
  app.use(HttpsMiddleware);
}

// ROUTE CONFIG
app.use(routes.web(container));
app.use(routes.api(container));

// EVENT CONFIG
routes.event(container);

// JOBS CONFIG
routes.jobs(container);

// SOCKET CONFIG
routes.socket(container);

// 404 ERROR HANDLER
app.use((req, res, next) => {
  next(createError(404));
});

// ERROR HANDLER
 // This middleware is injected vi Awilix because in future it may adapt to different environments
app.use(container.resolve('ErrorResponseMiddleware').handler);

app.container = container;

app.on('close', () => container.dispose());
module.exports = app;