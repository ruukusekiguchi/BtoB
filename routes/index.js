const router = require('express').Router();

//最初に表示される画面：ログイン画面
//route GET, '/', login.ejs
router.get('/', (req, res) => {
    res.render('login.ejs');
});

//会員登録：会員登録画面
//route GET, '/register', register.ejs
router.get('/register', (req, res) => {
    res.render('register.ejs');
});

//会員登録処理
//route POST, '/register/edit'
router.post('/register/edit', (req, res) => {
    console.log(req.body);
});

module.exports = router;