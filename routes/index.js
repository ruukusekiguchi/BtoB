const router = require('express').Router();

//最初に表示される画面：ログイン画面
//route GET, '/', login.ejs
router.get('/', (req, res) => {
    res.render('login.ejs');
});

//ログイン後表示：オークション画面
//route GET, '/auction', index.ejs
router.get('/auction', (req, res) => {
    res.render('index.ejs');
});

<<<<<<< HEAD
=======
//会員登録：会員登録画面
//route GET, '/register', register.ejs
>>>>>>> origin/uchidabranch
router.get('/register', (req, res) => {
    res.render('register.ejs');
});

<<<<<<< HEAD
=======
//詳細ボタン後表示：オークション詳細画面
//route GET, '/auction/id', detail.ejs
router.get('/auction/id', (req, res) => {
    res.render('detail.ejs');
});
>>>>>>> origin/uchidabranch

module.exports = router;