const router = require('express').Router();

router.get('/webhook', function (req, res) {
    if (req.query['hub.verify_token'] === 'cheese_pizza') {
        res.send(req.query['hub.challenge']);
    } else {
        res.send('Invalid verify token');
    }
});

module.exports = router;
