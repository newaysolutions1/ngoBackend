const jwt = require('jsonwebtoken');

const generateToken = async (user) => {
  const options = {
    expiresIn: process.env.SESSION,
    issuer: process.env.ISSUER
  }

  const payload = {
    sub: user._id,
    email: user.email,
    role: user?.role
  }

  const secrect_key = process.env.JWT_SECRET

  return await jwt.sign(payload, secrect_key, options)
};

module.exports = generateToken;
