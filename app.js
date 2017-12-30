const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('express-jwt');
const authConfig = require('./config/authConfig')();



const db = require("./databaseConnection");

const atendimentoRoute = require('./routes/atendimentoRoute');


const app = express();

app.use(cors());
app.use("/api", 
  jwt({
    secret: authConfig.secret,
    credentialsRequired: !authConfig.bypass
  }), 
  (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') { 
      return(res.status(401).send('Invalid authorization token'));
    }
  }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", (req, res, next) => {

  req.body.createdBy = (req.user && req.user._doc.login.username) ? req.user._doc.login.username : 'Ambiente de Test';
  req.body.updatedBy = (req.user && req.user._doc.login.username) ? req.user._doc.login.username : 'Ambiente de Test';
  req.login = (req.user && req.user._doc.login) ? req.user._doc.login : {};
   next();
})


// view engine setup
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());


/* Define Routes */
const baseUri = "/api";

app.use(baseUri, atendimentoRoute);

app.use('/atendimentoimagens', express.static('public/imagens'));



app.use((err, req, res, next) => {
	if(err.name === 'MongoError'){
		err.status = 500;
	}
	next(err);
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : err;

  console.error(err.stack || err)
  // render the error page
  res.status(err.status || 500);
  res.json(res.locals.error);
});

module.exports = app;
