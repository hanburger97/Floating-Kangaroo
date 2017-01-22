
var request = require('request');



function sendMessage(recipientId, message) {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
        method: 'POST',
        json: {
            recipient: {id: recipientId},
            message: message
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
};
function getUserInfo(id){
    var usr;
    request({
        url: 'https://graph.facebook.com/v2.6/' + id + '?fields=first_name,last_name,profile_pic,locale,timezone,gender',
        qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
        method: 'GET'

    }, function (err, res, body) {
            if (err){
                console.log(err)
            }
            else if (!err && res.statusCode == 200){
                //console.log(body);
                this.usr = body;
                console.log(this.usr);
                return this.usr;

            }
    });
    console.log(usr);
    return usr;
    /*Still need to work on it, variable body from inner scope is defined json but unable
    * to parse it to outer scope
    **/

};
module.exports.sendMessage  = sendMessage;
module.exports.getUserInfo = getUserInfo;