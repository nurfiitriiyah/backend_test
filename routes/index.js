var express = require('express');
var router = express.Router();
var backEnd = require('../backend/backend_transaction/transaction_show')


/* GET home page. */
router.get('/', async function(req, res, next) {
  var backend_show = await backEnd.transactionShowAllData()
  res.render('index', { title: 'Transaction', data : backend_show });
});

module.exports = router;
