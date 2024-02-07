const express = require('express');
const authorization = require('../middlewares/authentication')
const {GenerateURL,Redirect,Analytics} = require('../controllers/url')



const router = express.Router();

router.use("/url",authorization)
router.use("/:id",authorization)
router.use("/url/analytics/:id",authorization)

router.post("/url",GenerateURL)
router.post("/:id",Redirect)
router.post("/url/analytics/:id",Analytics)





module.exports = router;