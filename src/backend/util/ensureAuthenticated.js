import passport from "passport"

export default function ensureAuthenticated(req, res, next) {
    if (req.query.token){
        passport.authenticate('jwt', {session: false})
        next()
    }
    else {
        res.status(401).json({error: 'not logged in'}).end()
    }
}
