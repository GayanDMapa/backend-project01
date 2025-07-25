// middlewares/authMiddleware.js

import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract Bearer token

  if (!token) {
    return res.status(401).json({ message: 'No token provided. Unauthorized.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token. Forbidden.' });
    }

    req.user = user; // user should include user_id
    next();
  });
};

export default authenticateToken;
