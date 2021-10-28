"use strict";

const express = require('express');
const path = require('path');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');

const port = process.env.PORT || 6161;

var app = express();
app.use(compression()); // Enable compression

app.use(cors());
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 1000000
}));

app.use(bodyParser.json({ limit: '50mb' }));

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
var usersRouter = require('./routes/user');
var blogRouter = require('./routes/blog');


//app.use(express.static('uploads'));
app.use(express.static('routes/uploads'));
app.use(express.static(path.join(__dirname, 'BrandUserApp/dist/BrandUserApp')));

app.use('/api/user', usersRouter);
app.use('/api/blog', blogRouter);


app.get('/', (req, res) => {
    res.json({ msg: 'Server started running on ' + port })
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/userapp/build/index.html'));
});

app.listen(port, () => {
    console.log('Server started on port ' + port);
});

module.exports = app;



