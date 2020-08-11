var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

global.baseURL="http://192.168.1.100:3008"
global.lenURL=25

app.set('view engine', 'html');
app.engine('html', require('express-art-template'));
app.all("*", function(req, res, next) {
	var orginList = [
		"http://192.168.1.100",
		'http://59.61.83.130:29080',
	]
	if (orginList.includes(req.headers.origin)) {
		//设置允许跨域的域名，*代表允许任意域名跨域
		res.header("Access-Control-Allow-Origin", req.headers.origin);
	}
	// res.clearCookie('id')
	// res.cookie(prop, '', {expires: new Date(0)});
	res.set("Access-Control-Allow-Methods", "POST,GET,DELETE,PUT");
	res.set("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
	res.set("Access-Control-Allow-Credentials", true);
	// res.set('Access-Control-Allow-Max-Age', 3600);
	if ("OPTIONS" === req.method) return res.sendStatus(200);
	next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
  // res.render('error');
});

console.log('分析/同步服务启动，端口：3009')
module.exports = app;
