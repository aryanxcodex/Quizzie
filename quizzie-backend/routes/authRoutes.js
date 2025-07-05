import express from 'express';
import router from express.Router();
import { loginWithGoogle, googleCallback, logout } from '../controllers/authController.js';

router.get('/login/google', loginWithGoogle);

router.get('/auth/google/callback', googleCallback);

router.get('/logout', logout);

export default router;