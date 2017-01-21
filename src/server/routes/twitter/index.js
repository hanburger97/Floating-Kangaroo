var twitter = require ('../../lib/twitter');
var mongoose = require('mongoose');
var What = mongoose.model('Whats');
var wordArray = [];

// Call the stream function and pass in 'statuses/filter', our filter object, and our callback
twitter.stream('statuses/filter', {track: process.env.HASHTAG}, function(stream) {

    // ... when we get tweet data...
    stream.on('data', function(tweet) {

        // print out the text of the tweet that came in
        console.log(tweet.text);
        wordArray = tweet.text.split(" ");
        var whatResult = [];
        for (i=0; i <  wordArray.length; i++){
            var word = wordArray[i];
            What.findOne({tigger: word}).exec(function(error, data){
                if (error){
                    console.log('there was an error querying' + word + ' :'+error)
                } else if (data){
                    //do something with data.what
                    //append it to whatResult then export whatResult to make HTTP call in another file
                }
            })
        }


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
        });
    });

    // ... when we get an error...
    stream.on('error', function(error) {
        //print out the error
        console.log(error);
    });
});