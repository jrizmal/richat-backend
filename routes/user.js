var express = require('express');
const authenticated = require('../middleware/auth');
const { User } = require('../models/user');
var router = express.Router();

router.post("/register",authenticated,(req,res)=>{
    res.json({message: "Hello"})
})

module.exports = router;
