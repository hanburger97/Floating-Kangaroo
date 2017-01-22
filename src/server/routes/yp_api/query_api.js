// JavaScript source code
var action = require('../../models/action');
var request = require("request");
/**function quickSort (arr) {
    if (!arr.length)
        return arr;

    var pivot = arr.splice(0, 1);
    var less = [];
    var greater = [];

    arr.forEach(function (el) {
        console.log(JSON.stringify(el));

        var aa = el.ratings[0].averageRating;
        var bb = pivot[0].ratings[0].averageRating;
        if (aa >= bb)
            less.push(el);
        else
            greater.push(el)
    });

    return quickSort(less).concat(pivot, quickSort(greater))
};**/

function getResultwLocation (id, coords, whats) {
    var lat = coords.lat;
    var long = coords.long;
    var coord = JSON.stringify(lat) + ','+JSON.stringify(long);
    var what = '';
    var cards =[];
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
            //console.log(body);
            //console.log(body.searchResult[0].merchants[0]);
            var merchants = body.searchResult[0].merchants;
            //console.log(quickSort(merchants));
            for (i=0; i < 9; i++){
                var thisMerchant = merchants[i];
                var imgUrl = '';
                if (thisMerchant.images){
                    imgUrl = thisMerchant.images[0].url
                }
                /**
                var subtitles = thisMerchant.textLines[0].textLineLocalized;
                var subtitle = '';
                for (z=0; z<subtitles.length; z++){
                    var sub = subtitles[z];
                    if (sub && sub.languageCode == 'EN'){
                        subtitle = sub.value;
                        break;
                    }
                }**/

                //console.log(subtitle);
                var singleCard = {
                    "image_url":imgUrl,
                    "title": thisMerchant.businessName,
                    //"subtitle":subtitle.slice(0, 79),
                    "buttons":[
                        {
                            "type":"web_url",
                            "url":thisMerchant.urls[0].text,
                            "title":"View Website"
                        },{
                            "type":"web_url",
                            "url":'https://www.google.ca/maps/@'+thisMerchant.centroid+',19z',
                            "title":"View on map"
                        },{
                            "type":"phone_number",
                            "title":"Call",
                            "payload":'+1'+thisMerchant.phones[0].phoneNumber
                        }
                    ]
                };
                //console.log(JSON.stringify(singleCard))
                cards.push(singleCard);
            }
            console.log(JSON.stringify(cards))
            var msg = {
                "attachment":{
                    "type":"template",
                    "payload":{
                        "template_type":"generic",
                        "elements": cards
                    }
                }
            };
            action.sendMessage(id, msg)
        }
    })
}

module.exports.getResultwLocation = getResultwLocation;

