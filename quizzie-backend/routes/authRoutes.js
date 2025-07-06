import express, { Router } from 'express';
import { loginWithGoogle, googleCallback, logout } from '../controllers/authControllers.js';

const router = Router();

router.get('/login/google', loginWithGoogle);

router.get('/auth/google/callback', googleCallback);

router.get('/logout', logout);

export default router;