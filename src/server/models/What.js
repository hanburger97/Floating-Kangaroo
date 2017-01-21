const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var WhatSchema = new Schema({
    trigger : {
        type: String,
        required: true
    },
    what: {
        type: String
    }
});
module.exports = mongoose.model('Whats', WhatSchema);