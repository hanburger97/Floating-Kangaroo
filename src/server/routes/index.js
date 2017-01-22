const route1 = require('./route1');
const webhook_get = require('./webhook/get');
const webhook_post = require('./webhook/post');
const crud = require('./crud');

module.exports = {
    crud: crud,
    route1: route1,
    webhook_get:webhook_get,
    webhook_post:webhook_post

};