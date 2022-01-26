"use strict";

const express = require('express');
const path = require('path');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');

const port = process.env.PORT || 6262;

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
var tagRouter = require('./routes/tag');
var categoryRouter = require('./routes/category');
var blogRouter = require('./routes/blog');
var videoRouter = require('./routes/video');
var articleRouter = require('./routes/article');
var courseRouter = require('./routes/course');
var commonRouter = require('./routes/common');
var mediaRouter = require('./routes/media');
var cmsRouter = require('./routes/cms');
var forumheadingRouter = require('./routes/forumheading');
var forumRouter = require('./routes/forum');
var occupationRouter = require('./routes/occupation');
var organizationRouter = require('./routes/organization');
var sectorRouter = require('./routes/sector');
var academicdisciplineRouter = require('./routes/academicdiscipline');
var professionalinterestareaRouter = require('./routes/professionalinterestarea');
var researcherinterestareaRouter = require('./routes/researcherinterestarea');
var researchesRouter = require('./routes/researches');


//app.use(express.static('uploads'));
app.use(express.static('routes/uploads'));
app.use(express.static(path.join(__dirname, 'adminapp/build')));

app.use('/api/user', usersRouter);
app.use('/api/blog', blogRouter);
app.use('/api/tag', tagRouter);
app.use('/api/category', categoryRouter);
app.use('/api/video', videoRouter);
app.use('/api/article', articleRouter);
app.use('/api/course', courseRouter);
app.use('/api/common', commonRouter);
app.use('/api/media', mediaRouter);
app.use('/api/forumheading', forumheadingRouter);
app.use('/api/forum', forumRouter);
app.use('/api/cms', cmsRouter);
app.use('/api/occupation', occupationRouter);
app.use('/api/organization', organizationRouter);
app.use('/api/sector', sectorRouter);
app.use('/api/academicdiscipline', academicdisciplineRouter);
app.use('/api/professionalinterestarea', professionalinterestareaRouter);
app.use('/api/researcherinterestarea', researcherinterestareaRouter);
app.use('/api/researches', researchesRouter);



app.get('/', (req, res) => {
    res.json({ msg: 'Server started running on ' + port })
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/adminapp/build/index.html'));
});

app.listen(port, () => {
    console.log('Server started on port ' + port);
});

module.exports = app;
