import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "../models/users.js";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        console.log(profile);
        if (!user) {
          user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails?.[0]?.value,
          });
          await user.save();
        }

        return cb(null, user);
      } catch (err) {
        console.error("Error in Google OAuth strategy:", err);
        return cb(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  // Add null check for user
  if (!user || !user._id) {
    return done(new Error("User object is invalid"));
  }
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return done(new Error("User not found"));
    }
    done(null, user);
  } catch (err) {
    console.error("Error in deserializeUser:", err);
    done(err);
  }
});

export default passport;
