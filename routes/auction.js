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
    connection.query("SELECT * FROM car_detail;", (error, results) => {
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
router.get('/:id', (req, res) => {
    let values = [
        req.params.id
    ];
    connection.query("SELECT * FROM car_detail WHERE id=?;", values, (error, results) => {
        if(error){
            console.log('error connecting:' + error.stack);
            return;
        }
        console.log("車情報取得");
        console.log(results);
        res.render("./detail.ejs", {values:results});
    });
});

module.exports = router;