const express = require('express');
const app = express();
const http_socket = require('http').Server(app);
const io_socket = require('socket.io')(http_socket);
const mysql = require("mysql");
const passport = require('passport');
const session = require('express-session');

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

//sqlクローン
require('./cron/cron');

http_socket.listen(3000, () => console.log("server run and up"));

io_socket.on('connection', function(socket){
    console.log('connected');
    socket.on('c2s-join', function(msg){
        socket.join(msg.auction);
    });
    socket.on('c2s-chat', function(msg){
        //sql1...
        values = [
            msg.price,
            msg.userid,
            msg.auctionid
        ];
        console.log(values);
        connection.query("UPDATE auction SET bid_price = ?, user_info_id = ? WHERE id=?;", values, (error, results) => {
            if(error){
                res.status(400).send({values:'Error'});
                return;
            }
            console.log('auctionテーブルの入札価格更新');
            console.log(results);

            //sql2...
            values = [
                msg.userid,
                msg.auctionid
            ];
            console.log(values);
            connection.query("INSERT INTO bid_history(user_info_id,auction_id) VALUES(?,?);", values, (error, results) => {
                if(error){
                    res.status(400).send({values:'Error'});
                    return;
                }
                console.log('bid_historyに入札履歴挿入');
                console.log(results);

                //sql3...
                values = [
                    msg.auctionid
                ];
                console.log(values);
                connection.query("SELECT a.bid_price, COUNT(bh.auction_id) AS bid_num FROM auction a INNER JOIN bid_history bh ON a.id = bh.auction_id WHERE a.id=?;", values, (error, results) => {
                    if(error){
                        console.log('error connecting:' + error.stack);
                        return;
                    }
                    console.log('auctionテーブルから最高額取得');
                    console.log('c2s:' + results[0].bid_price + results[0].bid_num);
                    maxprice = results[0].bid_price;
                    bidnum = results[0].bid_num;
                    io_socket.to(msg.auctionid).emit('s2c-chat', maxprice, bidnum);
                });
            });
        });
    });
});