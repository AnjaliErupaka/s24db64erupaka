// require('dotenv').config();
// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// mongoose = require('mongoose');
// var dog = require('./models/dogs')

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var dogRouter = require('./routes/dogs');
// var gridRouter = require('./routes/grid');
// var pickRouter = require('./routes/pick');
// var resourceRouter = require('./routes/resource');

// // We can seed the collection if needed on
// //server start
// async function recreateDB(){
//   // Delete everything
//   await dog.deleteMany();
//   let instance1 = new
//   dog({Dog_Breed:"German shepherd", Dog_Color:'black',
//   Dog_Name: 5});
//   instance1.save().then(doc=>{
//   console.log("First object saved")}
//   ).catch(err=>{
//   console.error(err)
//   });
//   let instance2 = new
//   dog({Dog_Breed:"Golden retriever", Dog_Color:'white',
//   Dog_Name: 4});
//   instance2.save().then(doc=>{
//   console.log("First object saved")}
//   ).catch(err=>{
//   console.error(err)
//   });
//   let instance3 = new
//   dog({Dog_Breed:"pug", Dog_Color:'brown',
//   Dog_Name: 7});
//   instance3.save().then(doc=>{
//   console.log("First object saved")}
//   ).catch(err=>{
//   console.error(err)
//   });
//  }
//  let reseed = true;
//  if (reseed) {recreateDB();}
 
// const connectionString = process.env.MONGO_CON;

// var app = express();

 
// mongoose.connect(connectionString);
// //Get the default connection
// var db = mongoose.connection;
// //Bind connection to error event
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once("open", function(){
// console.log("Connection to DB succeeded")});
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/dogs', dogRouter); 
// app.use('/grid', gridRouter);
// app.use('/pick', pickRouter);
// app.use('/resource',resourceRouter);
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;

require('dotenv').config(); // Load environment variables from a .env file

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var dog = require('./models/dogs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dogRouter = require('./routes/dogs');
var gridRouter = require('./routes/grid');
var pickRouter = require('./routes/pick');
var resourceRouter = require('./routes/resource');

// We can seed the collection if needed on
// server start
async function recreateDB() {
  // Delete everything
  await dog.deleteMany();
  let instance1 = new dog({ Dog_Breed: "German shepherd", Dog_Color: 'black', Dog_Name: 5 });
  instance1.save().then(doc => {
    console.log("First object saved")
  }).catch(err => {
    console.error(err)
  });
  let instance2 = new dog({ Dog_Breed: "Golden retriever", Dog_Color: 'white', Dog_Name: 4 });
  instance2.save().then(doc => {
    console.log("First object saved")
  }).catch(err => {
    console.error(err)
  });
  let instance3 = new dog({ Dog_Breed: "pug", Dog_Color: 'brown', Dog_Name: 7 });
  instance3.save().then(doc => {
    console.log("First object saved")
  }).catch(err => {
    console.error(err)
  });
}
let reseed = true;
if (reseed) { recreateDB(); }

const connectionString = process.env.MONGO_CON;

var app = express();

mongoose.connect(connectionString);
// Get the default connection
var db = mongoose.connection;
// Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function () {
  console.log("Connection to DB succeeded")
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dogs', dogRouter);
app.use('/grid', gridRouter);
app.use('/pick', pickRouter);
app.use('/resource', resourceRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
