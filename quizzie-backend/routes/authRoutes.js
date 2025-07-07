import express, { Router } from "express";
import {
  loginWithGoogle,
  googleCallback,
  logout,
} from "../controllers/authControllers.js";
import User from "../models/users.js";

const router = Router();

router.get("/login/google", loginWithGoogle);

// Google OAuth callback route - this is where the user lands after Google auth
router.get("/google/callback", googleCallback, async (req, res) => {
  try {
    if (!req.user) {
      console.log("error");
      res.redirect("http://localhost:5173/error");
    }

    req.session.user = req.user;

    console.log("User authenticated:", req.user);

    res.redirect("http://localhost:5173/home");
  } catch (err) {
    console.error("Error in Google callback:", err);
    res.redirect("/login?error=server_error");
  }
});

router.get("/logout", logout);

router.get("/check-auth", (req, res) => {
  if (req.session.user) {
    res.json({ authenticated: true, user: req.session.user });
  } else {
    res.json({ authenticated: false });
  }
});

export default router;
