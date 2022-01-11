const router = require('express').Router();
const passport = require('passport');

//ログイン後表示：オークション画面
//route GET, '/auction', index.ejs
router.post('/login', (req, res) => {
    console.log(req.body);
    res.render('index.ejs');
});

//ログアウト
router.get('/logout', (req, res) => {
    res.redirect('/');
});

module.exports = router;