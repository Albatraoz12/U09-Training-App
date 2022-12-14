const User = require('../model/user');
const jwt = require('jsonwebtoken');

const authorization = (req, res, next) => {
  // const token = req.cookies.access_token;
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(500).json({ message: 'You are not Authorized!' });
  }
  try {
    const data = jwt.verify(token, process.env.SECRET);
    req.userId = data.id;
    req.role = data.role;
    return next();
  } catch {
    return res.status(500).json({ message: 'You have no valid token' });
  }
};

module.exports = { authorization };
