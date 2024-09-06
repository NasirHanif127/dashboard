import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

// Import routers
import connectDB from './db/db.js';
import notesRouter from './routes/notes.js';
import usersRouter from './routes/users.js';
import forgotRouter from './routes/forgot.js';
import signupRouter from './routes/signup.js';
import loginRouter from './routes/login.js';
import logoutRouter from './routes/logout.js';
import verifyTokenRouters from './routes/verify-tokens.js';
import revenueUpdatesRouter from './routes/revenue-updates.js';
import dummyRouter from './routes/dummy.js';

// Convert __dirname to ES Module equivalent
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// CORS setup - Allow requests from your Vercel frontend domain
app.use(cors({
  origin: 'https://your-frontend-domain.vercel.app',  // Replace with your actual frontend Vercel domain
  credentials: true,  // Allow cookies and credentials to be sent
}));

// API Routes
app.use('/api/notes', notesRouter);
app.use('/api/dummy', dummyRouter);
app.use('/api/users', usersRouter);
app.use('/api/signup', signupRouter);
app.use('/api/login', loginRouter);
app.use('/api/forgot-password', forgotRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/verify-token', verifyTokenRouters);
app.use('/api/revenue-updates', revenueUpdatesRouter);

// Welcome route for API root
app.get('/api', (req, res) => {
  res.status(200).send({ message: 'welcome dashboard api' });
});

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../client/build')));

// Any other route should serve the React frontend's index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Port configuration
const PORT = process.env.PORT || 8080;

// Connect to the database and start the server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`.bgCyan.white);
    });
  })
  .catch((err) => {
    console.error(`Database connection error: ${err}`.bgRed.white);
  });
