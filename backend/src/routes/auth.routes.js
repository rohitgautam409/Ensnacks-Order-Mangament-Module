const express = require('express')
const {clientSignup,clientLogin,adminSignup,adminLogin,getMe} = require('../controllers/auth.controller');
const {verifyToken} = require('../middleware/auth.middleware');


const router = express.Router();

//Client routes
router.post('/signup',clientSignup);
router.post('/login',clientLogin);

//Admin routes
router.post('admin/signup',adminSignup);
router.post('admin/login',adminLogin);

//Get the Current User
router.get('/me',verifyToken,getMe);

module.exports = router;
