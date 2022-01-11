const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('login.ejs');
});

<<<<<<< Updated upstream
=======
//ログイン後表示：オークション画面
//route GET, '/auction', index.ejs
router.get('/auction', (req, res) => {
    res.render('index.ejs');
});

//会員登録：会員登録画面
//route GET, '/register', register.ejs
router.get('/register', (req, res) => {
    res.render('register.ejs');
});

>>>>>>> Stashed changes
module.exports = router;