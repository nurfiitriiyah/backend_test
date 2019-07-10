var express = require('express');
var router = express.Router();
var backEnd = require('../backend/backend_transaction/transaction_show')


/* GET home page. */
router.get('/', async function (req, res, next) {
    var backend_show = await backEnd.transactionShowAllData()
    res.render('index', {title: 'Transaction', data: backend_show});
});

router.get('/pivot', async function (req, res, next) {
    var pivot_me = await backEnd.pivotMe()
    if (pivot_me.status === "ok") {
        res.status(200).json(pivot_me)
    } else {
        res.status(500).json(pivot_me)
    }
});

router.get('/generateME', async function (req, res, next) {
    var generate_me = await backEnd.generateME()
    if (generate_me.status === "ok") {
        res.status(200).json(generate_me)
    } else {
        res.status(500).json(generate_me)
    }
});


router.post('/insert', async function (req, res, next) {
    console.log("INSERTED")
    var insert_transaction = await backEnd.insertTransaction(req.body)
    if (insert_transaction.status === "ok") {
        res.status(200).json(insert_transaction)
    } else {
        res.status(500).json(insert_transaction)
    }
});




module.exports = router;
