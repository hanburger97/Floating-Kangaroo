const route1 = require('./route1');
const webhook_get = require('./webhook/get');
const crud = require('./crud');

module.exports = {
    crud: crud,
    route1: route1,
    webhook_get:webhook_get

};