import express from 'express';
import cors from 'cors';
import passport from './config/passport.js';
import authRoutes from './routes/authRoutes.js';
import { connectDB } from './config/db.js';

connectDB();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
// app.use(passport.session());

app.use('/auth', authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});