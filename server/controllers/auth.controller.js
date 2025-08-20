import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { expressjwt as expressJwt } from 'express-jwt';
import config from './../../config/config.js';

const signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!user.authenticate(req.body.password)) {
      return res.status(401).json({ error: "Email and password don't match." });
    }

    const token = jwt.sign({ _id: user._id }, config.jwtSecret, {
      expiresIn: '1d',
    });

    res.cookie('t', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // 1 day

    return res.json({
      token,
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
};

const signout = (req, res) => {
  res.clearCookie('t');
  return res.status(200).json({ message: 'Signed out' });
};

const requireSignin = expressJwt({
  secret: config.jwtSecret,
  algorithms: ['HS256'], // required in newer versions
  userProperty: 'auth',
});

const hasAuthorization = (req, res, next) => {
  const authorized =
    req.profile && req.auth && req.profile._id.toString() === req.auth._id;
  if (!authorized) {
    return res.status(403).json({ error: 'User is not authorized' });
  }
  next();
};

export default { signin, signout, requireSignin, hasAuthorization };
