const express = require('express');
const {newUserRegistration,userLogin,Authentication} = require('../controllers/user')
const authorization = require('../middlewares/authentication')


const router = express.Router();

router.use("/auth",authorization)

// signup route  /api/v1/user/signup
router.post('/signup',newUserRegistration)

//login route
router.post('/login',userLogin)

router.get('/auth', Authentication)

module.exports = router;

