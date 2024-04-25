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

const connection = mongoose.connect('mongodb://127.0.0.1:27017/admin-dashboard',{ useNewUrlParser: true, useUnifiedTopology : true });
var app = express();
app.use(fileUpload());
// Static Files
app.use(express.static('public'));
app.use(express.static('upload'));
app.use(cors()); 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

const handlebars = exphbs.create({ extname: '.hbs',});
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
