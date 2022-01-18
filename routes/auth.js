const router = require('express').Router();
const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306',
    database: 'auction_master'
});

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
    },
    function(email, password, done){
        let values = [
            email,
            password
        ];
        console.log(values);
        connection.query("SELECT * FROM user_info WHERE user_id=? AND user_pass=?;", values, (error, results) => {
            console.log(results);
            if(results == ""){
                return done(null, false);//認証NG
            }else{
                return done(null, results[0]);//認証OK
            }
        });
    }
));

router.post('/login',
    passport.authenticate('local',
    {
        session: false,
        //successRedirect: '/auction',
        failureRedirect: '/auction'
    }
    ),
    function(req, res){
        console.log("ログイン完了");
        req.session.username = req.user;
        res.redirect('/auction');
    }
);

// //ログアウト処理
// router.get('/logout', (req, res) => {
//   req.logout();
//   res.redirect('/');

//ログアウト
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');

});

module.exports = router;