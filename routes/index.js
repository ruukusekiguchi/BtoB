const router = require('express').Router();

//最初に表示される画面：ログイン画面
//route GET, '/', login.ejs
router.get('/', (req, res) => {
    res.render('login.ejs');
});

module.exports = router;