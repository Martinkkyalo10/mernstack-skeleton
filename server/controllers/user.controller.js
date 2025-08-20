import User from '../models/user.model.js';
import _ from 'lodash';
import errorHandler from '../helpers/dbErrorHandler.js';

// -----------------------------
// Create a new user
// -----------------------------
const create = async (req, res) => {
  try {
    const user = new User(req.body);
    const result = await user.save();
    res.status(200).json({
      message: 'Successfully signed up!',
      user: {
        _id: result._id,
        name: result.name,
        email: result.email,
        role: result.role,
      },
    });
  } catch (err) {
    res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// -----------------------------
// List all users
// -----------------------------
const list = async (req, res) => {
  try {
    const users = await User.find().select('name email role created updated');
    res.json(users);
  } catch (err) {
    res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// -----------------------------
// Middleware: Load user by ID
// -----------------------------
const userByID = async (req, res, next, id) => {
  try {
    const user = await User.findById(id).select(
      'name email role created updated'
    );
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    req.profile = user;
    next();
  } catch (err) {
    return res.status(400).json({ error: 'User not found' });
  }
};

// -----------------------------
// Read a single user
// -----------------------------
const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  res.json(req.profile);
};

// -----------------------------
// Update a user
// -----------------------------
const update = async (req, res) => {
  try {
    let user = req.profile;
    user = _.extend(user, req.body); // merge updates
    user.updated = Date.now();

    const updatedUser = await user.save();
    updatedUser.hashed_password = undefined;
    updatedUser.salt = undefined;
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// -----------------------------
// Delete a user
// -----------------------------
const remove = async (req, res) => {
  try {
    const deletedUser = await req.profile.remove();
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    res.json(deletedUser);
  } catch (err) {
    res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

export default { create, list, read, update, remove, userByID };
