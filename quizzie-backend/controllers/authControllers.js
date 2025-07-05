import passport from 'passport';
import { GoogleStrategy } from 'passport-google-oauth20';
import googleOAuth2Config from './google-oauth2.js';
import User from '../models/user.js';

passport.use(new GoogleStrategy({
  clientID: googleOAuth2Config.clientID,
  clientSecret: googleOAuth2Config.clientSecret,
  callbackURL: '/auth/google/callback',
  scope: ['profile', 'email'],
}, async (accessToken, refreshToken, profile, cb) => {
  try {
    const user = await User.findOrCreate({ googleId: profile.id });
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