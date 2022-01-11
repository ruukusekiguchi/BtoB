const router = require('express').Router();
const {ensureAuth, ensureGuest} = require('../middleware/auth');

const Story = require('../model/Story');

router.get('/', ensureGuest, (req, res) => {
    res.render('login.hbs', {
        layout: 'login'
    });
});

router.get('/dashboard', ensureAuth, async (req, res) => {
    try{
        const stories = await Story.find({user: req.user.id}).lean();
        res.render('dashboard.hbs', {
            name: req.user.firstName,
            stories
        });
    } catch(err){
        console.log(err);
        res.render('error/500.hbs');
    }
});

module.exports = router;