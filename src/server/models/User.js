const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    id:{
        type:Number,
        required: true,
        unique: true
    },
    handler : {
        type: String,
    },
    list: {
        type: Array
    },
    location: {
        lat: {
            type: Number
        },
        lon: {
            type: Number
        }
    }
});
module.exports = mongoose.model('Users', UserSchema);