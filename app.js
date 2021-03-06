const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose  = require('mongoose');
const mung = require('express-mung');
const isProduction = process.env.NODE_ENV === 'production';
const dotenv = require('dotenv');
dotenv.config();

if(isProduction){
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect("mongodb://localhost/mongo_dwp",  {
  	useCreateIndex: true,
  	useNewUrlParser: true, 
  	useUnifiedTopology: true
  });

  mongoose.set('debug', true);
}

require('./models/User');
require('./models/Recipe')

var app = express();

// // view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//response middleware
// app.use(afterMiddleware);





app.use(require('./routes'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  if(res.status(404)){
    res.send({error:["No data found"]});
  }
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({'error' : res.locals.message});
});





// // error handler





module.exports = app;
