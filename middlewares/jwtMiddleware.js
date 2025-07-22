const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.SECRETKEY);

    req.user = decoded;
    console.log(decoded);
     // you can access user info like req.user.userId
    next(); // allow the request to proceed
  } catch (err) {
    console.error('JWT error:', err.message);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = jwtMiddleware;
