const routes = require('express').Router();
const apiRoute = require('./apiRoute');
const htmlRoute = require('./htmlRoute');

routes.use('/', htmlRoute);
routes.use('/api', apiRoute);


module.exports = routes