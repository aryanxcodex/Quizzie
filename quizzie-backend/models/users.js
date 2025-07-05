import express from 'express';
import passport from './config/passport.js';
import authRoutes from './routes/authRoutes.js';
import User from './models/user.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use('/auth', authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});