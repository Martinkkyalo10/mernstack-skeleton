import express from 'express';
import userCtrl from '../controllers/user.controller.js';
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();

// -----------------------------
// User Routes
// -----------------------------

// GET /users       -> List all users (public or protected as needed)
// POST /users      -> Create a new user (public)
router.route('/').get(userCtrl.list).post(userCtrl.create);

// GET /users/:userId    -> Get a single user (authentication required)
// PUT /users/:userId    -> Update a user (authentication + authorization required)
// DELETE /users/:userId -> Delete a user (authentication + authorization required)
router
  .route('/:userId')
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove);

// Middleware: load user by ID for any route containing :userId
router.param('userId', userCtrl.userByID);

export default router;
