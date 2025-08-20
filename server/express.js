// mern-skeleton/server/express.js
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import Template from './../template';
import userRoutes from './routes/user.routes';

const app = express();
const CURRENT_WORKING_DIR = process.cwd();

// ✅ Built-in body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Middlewares
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

// ✅ Serve static files (logo, bundle.js, etc.)
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));
app.use('/public', express.static(path.join(CURRENT_WORKING_DIR, 'public')));

// ✅ Root route with SEO metadata
app.get('/', (req, res) => {
  res.status(200).send(Template());
});

// ✅ Example API routes (ready to enable)
// import userRoutes from './routes/user.routes.js'
// import authRoutes from './routes/auth.routes.js'
app.use('/api/users', userRoutes);
// app.use('/api/auth', authRoutes)

// ✅ Catch-all handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

export default app;
