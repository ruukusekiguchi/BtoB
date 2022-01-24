const router = require('express').Router();
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306',
    database: 'auction_master'
});

//ログイン後表示：オークション画面
//route GET, '/auction', index.ejs
router.get('/', (req, res) => {
    console.log(req.session.username);
    connection.query("SELECT * FROM car_detail cd INNER JOIN auction a ON cd.id = a.car_detail_id WHERE a.status_flag = 0;", (error, results) => {
        if(error){
            console.log('error connecting:' + error.stack);
            return;
        }
        console.log("車一覧取得");
        console.log(results);
        res.render("./index.ejs", {userid:req.session.username.id, values:results});
    });
});

//詳細ボタン後表示：オークション詳細画面
//route GET, '/auction/id', detail.ejs
router.get('/:userid/:auctionid', (req, res) => {
    let values = [
        req.params.auctionid
    ];
    connection.query("SELECT auction_id FROM bid_history WHERE auction_id=? GROUP BY auction_id;", values, (error, results) => {
        console.log(results);
        if(results == ""){
            console.log('空だよ');
            let values = [
                req.params.auctionid
            ];
            connection.query("SELECT * FROM auction a INNER JOIN car_detail cd ON a.car_detail_id = cd.id WHERE a.id=?;", values, (error, results) => {
                if(error){
                    console.log('error connecting:' + error.stack);
                    return;
                }
                console.log("車情報取得");
                console.log(results);
                results[0].bid_num = 0;
                console.log(results);
                res.render("./detail.ejs", {data:results, userid:req.params.userid, auctionid:req.params.auctionid});
            });
        }
        else{
            let values = [
                req.params.auctionid
            ];
            connection.query("SELECT a.*, cd.*, COUNT(bh.auction_id) AS bid_num FROM auction a INNER JOIN car_detail cd ON a.car_detail_id = cd.id INNER JOIN bid_history bh ON a.id = bh.auction_id WHERE a.id=? GROUP BY a.id;", values, (error, results) => {
                if(error){
                    console.log('error connecting:' + error.stack);
                    return;
                }
                console.log("車情報取得");
                console.log(results);
                res.render("./detail.ejs", {data:results, userid:req.params.userid, auctionid:req.params.auctionid});
            });
        }
    });
});

module.exports = router;