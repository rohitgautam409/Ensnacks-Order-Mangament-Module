/**
 * Authentication and authorization middleware
 */
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ error: 'Not authorized to access this route' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, name, email, role, companyName }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }
};

const requireClient = (req, res, next) => {
  if (req.user && req.user.role === 'client') {
    next();
  } else {
    return res.status(403).json({ error: 'Access denied. Clients only.' });
  }
};

module.exports = {
  verifyToken,
  requireAdmin,
  requireClient
};
