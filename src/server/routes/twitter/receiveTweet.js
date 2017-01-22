var twitter = require ('../../lib/twitter');
var mongoose = require('mongoose');
//var What = mongoose.model('Whats');
var User = mongoose.model('Users');
var wordArray = [];
//var async = require('async');

// Call the stream function and pass in 'statuses/filter', our filter object, and our callback
twitter.stream('statuses/filter', {track: process.env.HASHTAG}, function(stream) {

    // ... when we get tweet data...
    stream.on('data', function(tweet) {

        // print out the text of the tweet that came in
        console.log(tweet.text);
        wordArray = tweet.text.split(" ");
        console.log(wordArray);

        User.findOneAndUpdate({handler: tweet.user.screen_name}, {
            handler: tweet.user.screen_name,
            list: wordArray
        }, {upsert: true}, function (error){
            if (error) {
                console.log(error)
            }

        });


        /**
         //build our reply object
         var statusObj = {status: "@" + tweet.user.screen_name + ", How are you?!!"}

         //call the post function to tweet something
         twitter.post('statuses/update', statusObj,  function(error, tweetReply, response){

            //if we get an error print it out
            if(error){
                console.log(error);
            }

            //print the text of the tweet we sent out
            console.log(tweetReply.text);
        });**/
    });

    // ... when we get an error...
    stream.on('error', function(error) {
        //print out the error
        console.log(error);
    });
});