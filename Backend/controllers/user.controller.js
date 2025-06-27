const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model.js');
const generateToken = require('../utils/generateToken.js');
const verifyToken = require('../middlewares/auth.middleware.js');

const router = express.Router();

// @desc    New Registeration
// @access  Public

const UserRegisteration = async (req, res) => {
  const { name, email, password } = req.body;

  const validate = [name, email, password].some((value) => value == '');
  if (validate) {
    return res
      .status(401)
      .json({ status: 401, success: false, message: 'All Fields Required' });
  }

  // check
  const userExists = await User.findOne({ email });
  if (userExists)
    return res
      .status(400)
      .json({ status: 400, success: false, message: 'User already exists' });

  // hashing
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  const data = {
    id: user._id,
    name: user.name,
    email: user.email,
  };

  res
    .status(201)
    .json({
      status: 201,
      success: true,
      message: 'Successfully Registered',
      data: data,
    });
};

// @desc    Login API
// @access  Public

const UserLogin = async (req, res) => {
  const { email, password } = req.body;

  const validate = [, email, password].some((value) => value == '');
  if (!validate) {
    return res
      .status(401)
      .json({ status: 401, success: false, message: 'Invalid Credentials' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(401)
      .json({ status: 401, success: false, message: 'User Not Found' });
  }

  // password verification
  const isVerified = await bcrypt.compare(password, user.password);

  if (!isVerified || !user) {
    return res
      .status(401)
      .json({ status: 401, success: false, message: 'Invalid credentials' });
  }

  // generate session token for authorization
  const session_token = generateToken(user);

  // user info
  const data = {
    id: user._id,
    email: user.email,
  };

  return res
    .status(200)
    .json({
      status: 200,
      success: true,
      message: 'LoggedIn',
      data: data,
      s_token: session_token,
    });
};

// @desc    Get LoggedIn User Info
// @access  Private

const UserInfo = async (req, res) => {
  const user = await User.findById(req.user.sub).select('-password');
  return res.status(200).json(user);
};

module.exports = { UserRegisteration, UserLogin, UserInfo };
