const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var gracefulShutdown;

mongoose.connect(process.env.DB_URI, function (err) {
    if (err) {
        return console.log('there was a problem connecting to the database!' + err);
    }
    console.log('db connected!');

});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
// For nodemon restarts
process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app termination', function() {
        process.exit(0);
    });
});


require('../models/What');
require('../models/User');
require('../models/postback');
require('../models/response');