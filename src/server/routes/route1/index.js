const router = require('express').Router();
var Twitter = require('../../lib/twitter');

router.get('/route1', function (req,res,next){
    res.send('Hello WOrld')
});
module.exports = router;