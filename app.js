const express = require('express');
const app = express();
const http_socket = require('http').Server(app);
const io_socket = require('socket.io')(http_socket);
const mysql = require("mysql");
const passport = require('passport');
const session = require('express-session');
// const mysql = require('mysql');


//Connect to DB
// //接続
// const connection =mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'',
//     port:3306,
//     database:'auction_master'
// });
// //error
// connection.connect((error)=>{
//     if(error){
//         console.log('error connecting:'+err.stack);

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306',
    database: 'auction_master'
});

connection.connect((error) => {
    if(error){
        console.log('error connecting:' + error.stack);
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
app.use(express.static(__dirname + '/public', {index: false}));
app.use(express.static(__dirname + '/views', {index: false}));

//Routes
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));
app.use('/auth', require('./routes/auth'));
app.use('/auction', require('./routes/auction'));

http_socket.listen(3000, () => console.log("server run and up"));

io_socket.on('connection', function(socket){
    console.log('connected');
    socket.on('c2s-join', function(msg){
        socket.join(msg.auction);
    });
    socket.on('c2s-chat', function(msg){
        values = [
            'bid',
            msg.auction,
            msg.user,
            msg.price
        ];
        console.log(values);
        connection.query("INSERT INTO ??(auctionid,userid,price) VALUES(?,?,?);", values, (error, results) => {
            if(error){
                res.status(400).send({values:'Error'});
                return;
            }
            console.log('入札完了');
            console.log(results);

            values = [
                'bid',
                msg.auction
            ];
            connection.query("SELECT MAX(price) AS maxprice FROM ?? WHERE auctionid=?;", values, (error, results) => {
                if(error){
                    console.log('error connecting:' + error.stack);
                    return;
                }
                console.log('最高額取得');
                console.log('c2s:' + msg.auction + msg.user + results[0].maxprice);
                maxprice = results[0].maxprice;
                io_socket.to(msg.auction).emit('s2c-chat', msg, maxprice);
            });
        });
    });
});