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
    connection.query("SELECT * FROM car_detail c INNER JOIN auction a ON c.id = a.car_detail_id;", (error, results) => {
        if(error){
            console.log('error connecting:' + error.stack);
            return;
        }
        console.log("車一覧取得");
        console.log(results);
        res.render("./index.ejs", {data:req.session.username, values:results});
    });
});

//詳細ボタン後表示：オークション詳細画面
//route GET, '/auction/id', detail.ejs
router.get('/:userid/:carid', (req, res) => {
    let values = [
        req.params.carid
    ];
    connection.query("SELECT * FROM car_detail c INNER JOIN auction a ON c.id = a.car_detail_id WHERE c.id=?;", values, (error, results) => {
        if(error){
            console.log('error connecting:' + error.stack);
            return;
        }
        console.log("車情報取得");
        console.log(results);
        res.render("./detail.ejs", {data:results, userid:req.params.userid});
    });
});

module.exports = router;