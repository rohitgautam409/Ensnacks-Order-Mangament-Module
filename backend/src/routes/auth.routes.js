/**
 * Authentication routes
 */
const express = require('express');
const router = express.Router();
const { 
  clientSignup, 
  clientLogin, 
  adminSignup, 
  adminLogin, 
  getMe 
} = require('../controllers/auth.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// Client routes
router.post('/signup', clientSignup);
router.post('/login', clientLogin);

// Admin routes
router.post('/admin/signup', adminSignup);
router.post('/admin/login', adminLogin);

// Get current user
router.get('/me', verifyToken, getMe);

module.exports = router;
