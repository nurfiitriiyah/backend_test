var express = require('express');
var router = express.Router();
var unirest = require('unirest');

router.get('/getDatas', async function (req, res, next) {
    var paginate = req.query.pagin;
    if (parseInt(paginate) > 0) {
        var access_token = "nnnnn";
        var feeds = await unirest.get('https://graph.facebook.com/v3.3/me/feed?fields=application&access_token=' + access_token)
        var data = (JSON.parse(feeds.body));
        if (data.data.length < 1) {
            res.json({status: "ok", message: "Not Found"})
        }else{
            res.json(data.data[paginate])
        }
    } else {
        res.status(500).json({
            status: "nok"
        })
    }

});

module.exports = router;
