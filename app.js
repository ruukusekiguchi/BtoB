const express = require('express');
const app = express();
const dotenv = require('dotenv');
const {engine} = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
//Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

dotenv.config();
require('./config/passport')(passport);

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true},() => 
    console.log("connect to db")
);

//Body parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Method Override
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
}));

//Handlebars Helpers
const {formatDate, truncate, stripTags, editIcon, select} = require('./helpers/hbs');

//Handlebars
app.engine('.hbs', engine({
    helpers: {
        formatDate,
        truncate,
        stripTags,
        editIcon,
        select
    }, 
    defaulyLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

//Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.DB_CONNECT})
}));

//Passport Middlewares
app.use(passport.initialize());
app.use(passport.session());

// Set global var
app.use(function (req, res, next) {
    res.locals.user = req.user || null
    next();
});

//Static folder
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public', {index: false}));

//Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/stories', require('./routes/stories'));

app.listen(3000, () => console.log("server run and up"));