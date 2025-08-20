import dotenv from 'dotenv';
dotenv.config();

import config from '../config/config.js';
import connectDB from '../config/db.js';
import app from './express.js';

// Connect to MongoDB first
connectDB();

// Start the server
app.listen(config.port, (err) => {
  if (err) {
    console.error('❌ Error starting server:', err);
  } else {
    console.info(`✅ Server started on port ${config.port}`);
  }
});
