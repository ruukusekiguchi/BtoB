const router = require('express').Router();

//最初に表示される画面：ログイン画面
//route GET, '/', login.ejs
router.get('/', (req, res) => {
    res.render('login.ejs');
});

<<<<<<< HEAD
//ログイン後表示：オークション画面
//route GET, '/auction', index.ejs
router.get('/auction', (req, res) => {
    res.render('index.ejs');
});

//支払い画面
router.get('/payment_check', (req, res) => {
    res.render('payment_check.ejs');
});

//支払い画面
router.get('/payment', (req, res) => {
    res.render('payment.ejs');
});
=======
>>>>>>> a45d97178b05005a843e7034c8c8cba7307f4017
module.exports = router;