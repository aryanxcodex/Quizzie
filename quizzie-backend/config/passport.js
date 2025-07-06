import passport from 'passport';
import passportGoogleOAuth20 from 'passport-google-oauth20';
import dotenv from "dotenv";
import User from '../models/users.js';

dotenv.config();

passport.use(new passportGoogleOAuth20({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/google/callback',
  scope: ['profile', 'email'],
}, async (accessToken, refreshToken, profile, cb) => {
  try {
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      user = new User({ googleId: profile.id });
      await user.save();
    }
    return cb(null, user);
  } catch (err) {
    return cb(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;