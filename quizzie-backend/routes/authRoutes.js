import express, { Router } from "express";
import {
  loginWithGoogle,
  googleCallback,
  logout,
} from "../controllers/authControllers.js";
import User from "../models/users.js";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

router.get("/login/google", loginWithGoogle);

router.get("/google/callback", googleCallback, async (req, res) => {
  try {
    if (!req.user) {
      console.log("error");
      return res.json({ error: "Error in Google callback" });
    }

    req.session.user = req.user;

    console.log("User authenticated:", req.user);

    res.redirect(`${process.env.BASE_URL}/dashboard`);
  } catch (err) {
    console.error("Error in Google callback:", err);
    res.json({ error: "Error in Google callback" });
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
