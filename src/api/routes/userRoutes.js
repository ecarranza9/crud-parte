const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')
require('../config/passport')



router.post('/register', userController.Register)
router.get('/login', userController.Login)


module.exports = router;
