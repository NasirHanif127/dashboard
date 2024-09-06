import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
// import multer from 'multer';

// Import routers
import connectDB from "./db/db.js"
import notesRouter from './routes/notes.js';
import usersRouter from './routes/users.js';
import forgotRouter from './routes/forgot.js';
import signupRouter from './routes/signup.js';
import loginRouter from './routes/login.js';
import logoutRouter from './routes/logout.js';
// import verifyTokenRouter from './routes/verify-token.js';
import verifyTokenRouters from './routes/verify-tokens.js';
import revenueUpdatesRouter from './routes/revenue-updates.js';
import dummyRouter from './routes/dummy.js';


// Convert __dirname to ES Module equivalent
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());
app.use('/api/notes', notesRouter);
app.use('/api/dummy', dummyRouter);
app.use('/api/users', usersRouter);
app.use('/api/signup',  signupRouter);
app.use('/api/login',  loginRouter);
app.use('/api/forgot-password', forgotRouter);
app.use('/api/logout', logoutRouter);
 app.use('/api/verify-token', verifyTokenRouters);
app.use('/api/revenue-updates', revenueUpdatesRouter);

// Home route
app.get('/api', (req, res) => {
  res.status(200).send({ message: 'welcome dashboard api' });
});

const path = require("path");

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "../client/build")));

// Anything that doesn't match /api routes, send the index.html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});


// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Port
const PORT = process.env.PORT || 8080;

// Connect to the database before listening
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server Running im port ${PORT}`.bgCyan.white
      );
    });
  })
  .catch((err) => {
    console.error(`Database connection error: ${err}`.bgRed.white);
  });


