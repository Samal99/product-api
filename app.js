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
var offerRouter = require('./routes/offer');
var couponRouter = require('./routes/coupon');
var cartRouter = require('./routes/cart')
var orderRouter = require('./routes/order')
const mysql = require("mysql");
var multer = require('multer');
const exphbs = require('express-handlebars'); 
const fileUpload = require('express-fileupload');

// const connection = mongoose.connect('mongodb://127.0.0.1:27017/admin-dashboard',{ useNewUrlParser: true, useUnifiedTopology : true });
var app = express();
app.use(fileUpload());
var mongoose = require('mongoose');
const awsConnection = require('./awsDB');
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
const editerImagesPath = path.join(__dirname, 'models/editer')

app.use('/editer/image', express.static(editerImagesPath));
app.use('/product/image', express.static(productsImagesPath));

app.get('/images', function (req, res) {
  // res.sendFile(filepath);
  console.log('__dirname',__dirname)
  res.sendFile('register.jpg',  { root: dirPath })
  // res.send('respond with a resource')
});



const dbConfig = {
  host: (process.env.awsHost), 
  port:  (process.env.awsPort),                  
  user: (process.env.awsUser),          
  password: (process.env.awsPass)  
};
app.get('/databases', (req, res) => {
  // Create a connection to the database
  const connection = mysql.createConnection(dbConfig);
  console.log('connection', connection)

  // res.json({ connection: JSON.parse(connection) });

  // Connect to the database
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err.stack);
      return res.status(500).json({ error: 'Database connection failed', details: err.message });
    }
    console.log('Connected to the database as id ' + connection.threadId);

    // Query to list all databases
    connection.query('SHOW DATABASES', (err, results, fields) => {
      if (err) {
        console.error('Error executing query:', err.stack);
        return res.status(500).json({ error: 'Query execution failed', details: err.message });
      }
      console.log('Databases:', results);

      // Close the connection
      connection.end((err) => {
        if (err) {
          console.error('Error closing the connection:', err.stack);
          return res.status(500).json({ error: 'Failed to close connection', details: err.message });
        }
        console.log('Connection closed.');
      });

      res.json({ databases: results });
    });
  });


});



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/roles', rolesRouter);
app.use('/product', productRouter);
app.use('/offer', offerRouter);
app.use('/coupon', couponRouter);
app.use('/cart', cartRouter);
app.use('/order',orderRouter)



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
