import mongoose from 'mongoose';
import User from '../../server/models/user.model.js';
import { getErrorMessage } from '../../server/helpers/dbErrorHandler.js';

// MongoDB connection string from environment variables
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB (reuse existing connection if available)
const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(MONGO_URI);
      console.log('MongoDB connected');
    } catch (err) {
      console.error('MongoDB connection error:', err);
      throw new Error('Database connection failed');
    }
  }
};

export async function handler(event, context) {
  context.callbackWaitsForEmptyEventLoop = false; // Important for serverless functions

  await connectDB();

  try {
    const { httpMethod } = event;
    const { userId } = event.queryStringParameters || {};

    // -------------------------
    // GET: Fetch all users or single user
    // -------------------------
    if (httpMethod === 'GET') {
      if (userId) {
        const user = await User.findById(userId).select(
          'name email updated created'
        );
        if (!user) {
          return {
            statusCode: 404,
            body: JSON.stringify({ error: 'User not found' }),
          };
        }
        return { statusCode: 200, body: JSON.stringify(user) };
      } else {
        const users = await User.find().select('name email updated created');
        return { statusCode: 200, body: JSON.stringify(users) };
      }
    }

    // -------------------------
    // POST: Create new user
    // -------------------------
    else if (httpMethod === 'POST') {
      const data = JSON.parse(event.body);
      const user = new User(data);
      await user.save();
      return {
        statusCode: 201,
        body: JSON.stringify({ message: 'User created successfully!' }),
      };
    }

    // -------------------------
    // PUT: Update existing user
    // -------------------------
    else if (httpMethod === 'PUT') {
      if (!userId) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'UserId is required for update' }),
        };
      }
      const data = JSON.parse(event.body);
      const user = await User.findById(userId);
      if (!user) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: 'User not found' }),
        };
      }
      Object.assign(user, data);
      user.updated = Date.now();
      await user.save();
      user.hashed_password = undefined;
      user.salt = undefined;
      return { statusCode: 200, body: JSON.stringify(user) };
    }

    // -------------------------
    // DELETE: Delete user
    // -------------------------
    else if (httpMethod === 'DELETE') {
      if (!userId) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'UserId is required for deletion' }),
        };
      }
      const user = await User.findById(userId);
      if (!user) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: 'User not found' }),
        };
      }
      await user.remove();
      user.hashed_password = undefined;
      user.salt = undefined;
      return { statusCode: 200, body: JSON.stringify(user) };
    }

    // -------------------------
    // Other methods not allowed
    // -------------------------
    else {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method Not Allowed' }),
      };
    }
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: getErrorMessage(err) }),
    };
  }
}
