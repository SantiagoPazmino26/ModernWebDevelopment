import {Router} from 'express'
import passport from "passport"
import User from "backend/entities/User"
const jwt = require('jsonwebtoken');

import ensureAuthenticated from 'backend/util/ensureAuthenticated'

export default function authApi() {
    const router = new Router()

    router.post('/auth/signup',  async (req, res, next) => {
        const {email, nickname, password} = req.body
        let user
        try {
            user = await User.createChecked(email, nickname, password)
        } catch (err) {
            res.status(400).json({error: err.message}).end()
            return
        }

        const savedUser = await user.save()
        req.login(savedUser, err => {
            if (err) {
                res.status(400).end()
                return
            }
            // generate a signed son web token with the contents of user object and return it in the response
            const token = jwt.sign(savedUser.toJSON(), 'addressbook.sid');
            res.json({savedUser,token})
            next()
        })
    })

    router.get('/auth/loggedin', (req, res) => {
        if (req.isAuthenticated()) {
            res.json({loggedIn: true})
        } else {
            res.status(401).json({loggedIn: false})
        }
    })

    /*router.put('/auth/login', passport.authenticate('local'), (req, res) => {
     const token = jwt.sign(req.user, 'addressbook.sid');
     res.json(req.user, token)
    })*/

    // POST login.
    router.put('/auth/login', function (req, res, next) {
        passport.authenticate('local', {session: false}, (err, user, info) => {
            if (err || !user) {
                return res.status(400).json({
                    message: 'Something is not right',
                    user   : user
                });
            }
            req.login(user, {session: false}, (err) => {
                if (err) {
                    res.send(err);
                }
                // generate a signed son web token with the contents of user object and return it in the response
                const token = jwt.sign(user.toJSON(), 'addressbook.sid');
                return res.json({user, token});
            });
        })(req, res);
    });

    router.put('/auth/logout', ensureAuthenticated, (req, res) => {
        req.logout()
        res.json({})
    })

    return router
}
