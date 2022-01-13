const router = require('express').Router();
const passport = require('passport');

router.post('/login', (req, res) => {
    console.log(req.body);
    res.redirect('/auction');
});


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