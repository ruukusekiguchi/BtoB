const router = require('express').Router();

//ログイン後表示：オークション画面
//route GET, '/auction', index.ejs
router.get('/', (req, res) => {
    res.render('index.ejs');
});

//詳細ボタン後表示：オークション詳細画面
//route GET, '/auction/id', detail.ejs
router.get('/id', (req, res) => {
    res.render('detail.ejs');
});

module.exports = router;