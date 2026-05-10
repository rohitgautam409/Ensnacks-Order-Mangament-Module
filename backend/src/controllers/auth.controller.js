/**
 * Auth controller for signup, login, and getMe
 */
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { z } = require('zod');

const signupSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).min(2, 'Name must be at least 2 characters long'),
  email: z.string({ required_error: 'Email is required' }).email('Invalid email format'),
  password: z.string({ required_error: 'Password is required' }).min(8, 'Password must be at least 8 characters long'),
  companyName: z.string({ required_error: 'Company name is required' }).min(1, 'Company name is required')
});

const loginSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email('Invalid email format'),
  password: z.string({ required_error: 'Password is required' }).min(1, 'Password is required')
});

const handleSignup = async (req, res, next, role) => {
  try {
    const validation = signupSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.errors[0].message });
    }

    const { name, email, password, companyName } = validation.data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    const user = new User({
      name,
      email,
      password,
      companyName,
      role
    });
    
    await user.save();

    return res.status(201).json({ message: `Account created successfully` });
  } catch (err) {
    next(err);
  }
};

const handleLogin = async (req, res, next, role) => {
  try {
    const validation = loginSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.errors[0].message });
    }

    const { email, password } = validation.data;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    if (!user.active) {
      return res.status(403).json({ error: 'Account deactivated. Contact Ensnacks team.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    if (user.role !== role) {
      return res.status(401).json({ error: `Access denied. You are not an ${role}.` });
    }

    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      companyName: user.companyName
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    return res.status(200).json({ token, user: payload });
  } catch (err) {
    next(err);
  }
};

// Client specific controllers
const clientSignup = (req, res, next) => handleSignup(req, res, next, 'client');
const clientLogin = (req, res, next) => handleLogin(req, res, next, 'client');

// Admin specific controllers
const adminSignup = (req, res, next) => handleSignup(req, res, next, 'admin');
const adminLogin = (req, res, next) => handleLogin(req, res, next, 'admin');

const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  clientSignup,
  clientLogin,
  adminSignup,
  adminLogin,
  getMe
};
