const router = require('express').Router();

router.get('/route1', function (req,res,next){
    res.send('Hello WOrld')
});
module.exports = router;