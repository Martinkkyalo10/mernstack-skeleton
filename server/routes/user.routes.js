import express from 'express';
import userCtrl from '../controllers/user.controller.js';
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();

// -----------------------------
// User Routes
// -----------------------------

// Route: /api/users
// GET    -> List all users (can be public or protected)
// POST   -> Create a new user (public)
router.route('/').get(userCtrl.list).post(userCtrl.create);

// Route: /api/users/:userId
// GET    -> Get a single user (requires authentication)
// PUT    -> Update a user (requires authentication + authorization)
// DELETE -> Delete a user (requires authentication + authorization)
router
  .route('/:userId')
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove);

// Middleware: automatically extract user by ID for any route with :userId
router.param('userId', userCtrl.userByID);

export default router;
