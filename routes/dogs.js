var express = require('express');
var passport = require('passport');

const dog_controller = require('../controllers/dogs');
var router = express.Router();
// A little function to check if we have an authorized user and continue on
// redirect to login.
const secured = (req, res, next) => {
    if (req.user) {
        return next();
    }
    res.redirect("/login");
}
// GET home page
router.get('/', dog_controller.dog_view_all_Page);

/* GET detail dog page */
router.get('/detail', dog_controller.dog_view_one_Page);

/* GET create dog page */
router.get('/create', secured, dog_controller.dog_create_Page);

/* GET create update page */
router.get('/update', secured, dog_controller.dog_update_Page);

router.post('/login', passport.authenticate('local'), function (req, res) {
    res.redirect('/');
});

/* GET delete dog page */
router.get('/delete', secured, dog_controller.dog_delete_Page);

module.exports = router;


