var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const cors = require('cors') 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var rolesRouter = require('./routes/roles');
var productRouter = require('./routes/products');

var multer = require('multer');
const exphbs = require('express-handlebars'); 
const fileUpload = require('express-fileupload');

// const connection = mongoose.connect('mongodb://127.0.0.1:27017/admin-dashboard',{ useNewUrlParser: true, useUnifiedTopology : true });
var app = express();
app.use(fileUpload());
var mongoose = require('mongoose');
// var autoIncrement = require('mongoose-auto-increment-fix');
// const autoIncrement = require('mongoose-auto-increment');
  // autoIncrement.initialize(connection);

// app.use(bodyParser.json()); // support json encoded bodies
// app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.use(express.static('upload'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/images', express.static('images'));

// const a = require('./models/upload')
const dirPath = path.join(__dirname, './models/upload');
const productsImagesPath = path.join(__dirname, 'models/product')
app.use('/product/image', express.static(productsImagesPath));

app.get('/images', function (req, res) {
  // res.sendFile(filepath);
  console.log('__dirname',__dirname)
  res.sendFile('register.jpg',  { root: dirPath })
  // res.send('respond with a resource')
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/roles', rolesRouter);
app.use('/product', productRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
