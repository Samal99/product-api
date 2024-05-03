var express = require('express');
var router = express.Router();
const app = express();
const bodyParser = require("body-parser")
// const routes = require('./Router/index')

app.use(bodyParser.json());

// app.use(routes);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
 

module.exports = router;     
