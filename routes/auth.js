const router = require('express').Router();
const passport = require('passport');

<<<<<<< HEAD
//ログイン認証
=======
//ログイン後表示：オークション画面
//route GET, '/auction', index.ejs
>>>>>>> origin/uchidabranch
router.post('/login', (req, res) => {
    console.log(req.body);
    res.redirect('/auction');
});

<<<<<<< HEAD
//ログアウト処理
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
=======
//ログアウト
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
>>>>>>> origin/uchidabranch
});

module.exports = router;