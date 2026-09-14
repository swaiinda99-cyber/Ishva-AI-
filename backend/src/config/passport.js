// passport.js — Google OAuth strategy config
// TODO: Add real credentials via .env
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

// TODO: Replace with real credentials from .env
// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: "/api/auth/google/callback",
// }, (accessToken, refreshToken, profile, done) => {
//   const user = {
//     id: profile.id,
//     name: profile.displayName,
//     email: profile.emails[0].value,
//     picture: profile.photos[0].value,
//   };
//   return done(null, user);
// }));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

export default passport;
