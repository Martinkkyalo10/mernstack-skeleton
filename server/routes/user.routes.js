import express from 'express';
import userCtrl from '../controllers/user.controller.js';

const router = express.Router();

// -----------------------------
// User Routes
// -----------------------------

// GET /api/users       -> List all users
// POST /api/users      -> Create a new user
router.route('/').get(userCtrl.list).post(userCtrl.create);

// GET /api/users/:userId    -> Get a single user
// PUT /api/users/:userId    -> Update a user
// DELETE /api/users/:userId -> Delete a user
router
  .route('/:userId')
  .get(userCtrl.read)
  .put(userCtrl.update)
  .delete(userCtrl.remove);

// Middleware: load user by ID for any route containing :userId
router.param('userId', userCtrl.userByID);

export default router;
