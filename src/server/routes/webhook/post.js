var express = require('express');
var router = express.Router();
var action = require('../../models/action');
var mongoose = require('mongoose');
var Response = mongoose.model('Responses');
//var User = mongoose.model('Users');
var Postback = mongoose.model('Postbacks');
var async = require('async');


router.post('/webhook', function (req, res) {
    var events = req.body.entry[0].messaging;

    for (i = 0; i < events.length; i++) {
        var event = events[i];
        /*** TIMEOUT SECTION **/

        if (event.message && event.message.quick_reply){
            console.log('In quickreply elif');
            Postback.findOne({trigger : event.message.quick_reply.payload}).exec(function (error, data){
                if (error) {
                    console.log(error)
                } else if (!data){
                    action.sendMessage(event.sender.id, {text: "Sorry I didn't understand  that", quick_replies:[

                        {
                            "content_type":"text",
                            "title":"Back to menu",
                            "payload":"SERVICES"
                        }

                    ]})
                } else {
                    action.sendMessage(event.sender.id, data.response)
                }
            })
        }  else if (event.message && event.message.text) {
            event.message.text = event.message.text.toLowerCase();
            var words = event.message.text.split(' ');
            var words2 = event.message.text.split(' ');
            //console.log(words);


            var f1 = function (callback) {
                var r = [];
                for (z = 0; z < words.length; z++) {
                    var word = words[z];
                    Response.findOne({
                        trigger: word
                    }).exec(function (err, data) {
                        if (err) {
                            console.log(err);
                        }

                        else if (!data && !stopAutoReply) {
                            //console.log('No data');
                            r.push('a');
                            //console.log("r is " + r);
                            //console.log('words2 is ' + words2);
                            if (r.length == words2.length) {
                                //console.log("NO REPLY");
                                action.sendMessage(event.sender.id, {text: "Sorry I didn't get that, I am a bot afterall", quick_replies:[

                                    {
                                        "content_type":"text",
                                        "title":"Back to Menu",
                                        "payload":"SERVICES"
                                    }

                                ]});
                            }
                        }
                        else {
                            stopAutoReply = false;
                            if (data && data.action && data.action.operation == 'Timeout') {
                                var until = new Date(new Date().getTime() + (Number(data.action.value) * 1000));
                                pausedUsers[event.sender.id] = until;
                                action.sendMessage(event.sender.id, data.response);
                            } else if (data) {
                                action.sendMessage(event.sender.id, data.response);

                            }
                        }
                    });
                }
                console.log('f1 executed');
                console.log(r);
                callback();
            };

            async.series([
                f1
            ], function (error) {
                if (error) {
                    console.log(error)
                }
                console.log('executed f1, f2');

            });

        } else if (event.postback) {

            Postback.findOne({
                trigger: event.postback.payload
            }).exec(function (err, data) {
                if (err) {
                    console.log(err)
                } else if (!data) {
                    action.sendMessage(event.sender.id, {text: "Oops it seems the button you clicked ", quick_replies:[
                        {
                            "content_type":"text",
                            "title":"Return to menu",
                            "payload":"SERVICES"
                        }

                    ]});
                } else {
                    action.sendMessage(event.sender.id, data.response);
                }
            });
        }
    }
    res.sendStatus(200);
});

module.exports = router;