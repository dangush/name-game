var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/generate', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/location', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
