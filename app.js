var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var insertUser = require("./routes/insertUser");
var selectUser = require("./routes/selectUser");
var selectAllUsers = require("./routes/selectAllUsers");
var updateUser = require("./routes/updateUser");
var deleteUser = require("./routes/deleteUser");

var cors = require("cors");
var bodyParser = require("body-parser");

var app = express();
// app.use(cors());
app.use(cors({ origin: 'http://localhost:8080' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/insertuser', insertUser);
app.use('/selectuser', selectUser);
app.use('/selectallusers', selectAllUsers);
app.use('/updateuser', updateUser);
app.use('/deleteuser', deleteUser);

module.exports = app;
