const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) 
    return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
     // Attach decoded payload to the request
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

exports.authenticateManager = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'manager') {
      return res.status(403).json({ error: 'Forbidden: Manager access required' });
    }
    // Attach decoded payload to the request
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(403).json({ error: 'Invalid token' });
  }
};
