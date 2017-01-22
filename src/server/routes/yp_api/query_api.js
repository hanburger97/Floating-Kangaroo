// JavaScript source code
var action = require('../../models/action');
var request = require("request");

function getResultwLocation (id, coords, whats) {
    var lat = coords.lat;
    var long = coords.long;
    var coord = JSON.stringify(lat) + ','+JSON.stringify(long);
    var what = '';
    for (i=0; i < whats.length; i++){
        what += whats[i] + ' ';

    }
    console.log(what);

    var headers = {
        'Content-Type': 'application/json'
    };

    var options = {
        url: "http://hackaton.ypcloud.io/search",
        method: "POST",
        headers: headers,
        json: {
            "search": [
                {
                    "searchType":"PROXIMITY",
                    "collection":"MERCHANT",
                    "what": what,
                    "where": {
                        "type":"GEO",
                        "value": coord
                    }
                }
            ]
        }
    };


    request(options, function (error, response, body) {
        if (!error) {
            console.log(body);
            console.log(body.searchResult[0].merchants[0]);
            var merchants = body.searchResult[0].merchants;
            for (i=0; i < 2; i++){
                var thisMerchant = merchants[i];
                var imgUrl = '';
                if (thisMerchant.images){
                    imgUrl = thisMerchant.images[0].url
                }
                var subtitles = thisMerchant.textLines[0].textLineLocalized;
                var subtitle = '';
                for (i=0; i<subtitles.length; i++){
                    var sub = subtitles[i];
                    if (sub && sub.languageCode == 'EN'){
                        subtitle = sub.value;
                        break;
                    }
                }
                console.log(subtitle);
                var singleCard = {
                    "title": thisMerchant.businessName,
                    "image_url":imgUrl,
                    "subtitle":subtitle,
                    "buttons":[
                        {
                            "type":"web_url",
                            "url":"https://petersfancybrownhats.com",
                            "title":"View Website"
                        },{
                            "type":"postback",
                            "title":"Start Chatting",
                            "payload":"DEVELOPER_DEFINED_PAYLOAD"
                        }
                    ]
                };
                console.log(JSON.stringify(singleCard))

            }
        }
    })
}
module.exports= getResultwLocation;
var whats=['restaurant','italian'];
var coords = {
    lat: 45.4754418,
    long: -73.5863705
};
getResultwLocation(2, coords, whats);
