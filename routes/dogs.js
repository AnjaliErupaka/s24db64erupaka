var express = require('express');
const dog_controllers = require('../controllers/dogs')
var router = express.Router();
 
/* GET home page. */
router.get('/', dog_controllers.dog_view_all_Page);
 
module.exports = router;


