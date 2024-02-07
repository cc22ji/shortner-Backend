const express = require('express');
const {newUserRegistration,userLogin} = require('../controllers/user')


const router = express.Router();

// signup route  /api/v1/user/signup
router.post('/signup',newUserRegistration)

//login route
router.post('/login',userLogin)

module.exports = router;

