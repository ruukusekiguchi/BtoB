const router = require('express').Router();
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306',
    database: 'auction_master'
});

//会員登録：会員登録画面
//route GET, '/user/add',
router.get('/add', (req, res) => {
    res.render('register.ejs');
    console.log('とんでるよ');
});

//会員登録処理
//route POST, '/user'
router.post('/', (req, res) => {
    const address = req.body.prefecture + req.body.city + req.body.block + req.body.building;
    values = [
        req.body.user_id,
        req.body.name,
        address,
        req.body.mail,
        req.body.password,
    ];
    console.log(values);
    connection.query("INSERT INTO user_info(user_id,user_name,user_address,user_email,user_pass) VALUES(?,?,?,?,?);", values, (error, results) => {
        if(error){
            res.status(400).send({values:'Error'});
            return;
        }
        console.log('ユーザー登録完了');
        console.log(results);
        res.redirect('/');
    });
});

//マイページ：マイページ画面
//route GET, '/user/mypage/id',
router.get('/mypage/:userid', (req, res) => {
    values = [
        req.params.userid
    ]
    connection.query("SELECT * FROM payment p INNER JOIN auction a ON p.auction_id = a.id INNER JOIN car_detail cd ON a.car_detail_id = cd.id INNER JOIN user_info ui ON p.user_info_id = ui.id WHERE p.user_info_id = ?;", values, (error, results) => {
        if(error){
            console.log('error connecting:' + error.stack);
            return;
        }
        console.log("マイページ情報取得");
        console.log(results);

        res.render('mypage.ejs', {values:results, userid:req.params.userid});
    });
});

module.exports = router;