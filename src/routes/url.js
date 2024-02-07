const express = require('express');
const authorization = require('../middlewares/authentication')
const {GenerateURL,Redirect,Analytics,Deleteitem} = require('../controllers/url')



const router = express.Router();
//for authorization through middleware
router.use("/url",authorization)
router.use("/:id",authorization)
router.use("/url/all",authorization)
router.use("/url/delete/:shortId",authorization)


// protected routes  for all sensitive data
router.post("/url",GenerateURL)
router.get("/:id",Redirect)
router.get("/url/all",Analytics)
router.delete("/url/delete/:shortId",Deleteitem)

module.exports = router;