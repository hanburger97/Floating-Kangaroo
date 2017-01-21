var twitter = require ('../../lib/twitter');

// Call the stream function and pass in 'statuses/filter', our filter object, and our callback
twitter.stream('statuses/filter', {track: '#TechKnightsDemo'}, function(stream) {

    // ... when we get tweet data...
    stream.on('data', function(tweet) {

        // print out the text of the tweet that came in
        console.log(tweet.text);

        //build our reply object
        var statusObj = {status: "Hi @" + tweet.user.screen_name + ", How are you?"}

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