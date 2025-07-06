import passport from 'passport';

export const loginWithGoogle = (req, res, next) => {
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })(req, res, next);
};

export const googleCallback = (req, res, next) => {
  passport.authenticate('google', {
    failureRedirect: '/login',
  })(req, res, next);
};

export const logout = (req, res) => {
  req.logout();
  res.redirect('/');
};