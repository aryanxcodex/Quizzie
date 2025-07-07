import passport from "passport";
import dotenv from "dotenv";

dotenv.config();

export const loginWithGoogle = (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })(req, res, next);
  next();
};

export const googleCallback = (req, res, next) => {
  passport.authenticate("google")(req, res, next);
};

export const logout = (req, res) => {
  req.logout();
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect(`${process.env.BASE_URL}/`);
    }
  });
};
