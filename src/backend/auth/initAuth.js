import session, {MemoryStore} from "express-session"
import passport from "passport"

import User from "backend/entities/User"
import AuthStrategy from "./AuthStrategy"
const LocalStrategy = require('passport-local').Strategy;

const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

export default function initAuth(app) {
    const sessionId = 'addressbook.sid'
    const sessionSecret = 'some very random and secure secret'
    const sessionStore = new MemoryStore()
    const sessionConfig = {
        key: sessionId,
        secret: sessionSecret,
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        cookie: {},
    }
    //app.use(session(sessionConfig))
    app.use(passport.initialize())
    //app.use(passport.session())
    //passport.use('local', new AuthStrategy())

    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function (email, password, cb) {

            //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
            return User.findAuthenticated(email, password)
                .then(user => {
                    if (!user) {
                        return cb(null, false, {message: 'Incorrect email or password.'});
                    }
                    return cb(null, user, {message: 'Logged In Successfully'});
                })
                .catch(err => {
                    console.log(err)
                    cb(err)
                });
        }
    ));

    passport.use(new JWTStrategy({
            jwtFromRequest: ExtractJWT.fromUrlQueryParameter('token'),
            secretOrKey   : sessionId
        },
        function (jwtPayload, cb) {

            //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
            return User.findOneById(jwtPayload.id)
                .then(user => {
                    return cb(null, user);
                })
                .catch(err => {
                    return cb(err);
                });
        }
    ));

    //passport.serializeUser((user, done) => done(null, user._id))
    //passport.deserializeUser(async (_id, done) => done(null, await User.findOne({_id})))
}
