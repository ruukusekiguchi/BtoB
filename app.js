const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const mysql = require('mysql');


//Connect to DB
//接続
const connection =mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    port:3306,
    database:'auction_master'
});
//error
connection.connect((error)=>{
    if(error){
        console.log('error connecting:'+err.stack);
        return;
    }
    console.log('success');
});




//Body parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Handlebars

//Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

//Passport Middlewares
app.use(passport.initialize());
app.use(passport.session());

//Static folder
app.use(express.static(__dirname + '/views', {index: false}));

//Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));

app.listen(3000, () => console.log("server run and up"));