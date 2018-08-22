import {Router} from 'express'

import ensureAuthenticated from 'backend/util/ensureAuthenticated'
import Trip from "backend/entities/Trip"

export default function tripApi() {
    const router = new Router();

    router.use(ensureAuthenticated)

    router.get('/trip', ensureAuthenticated, (req, res) => {
        res.json(req.user)
    })

    router.get('/trip/all', ensureAuthenticated, async (req, res, next) => {
        try {
            const trips = await Trip.list()
            res.json({trips})
        } catch (err) {
            res.status(500).json({error: 'internal server error'}).end()
            return
        }
        next()
    })

    router.post('/trip/add', ensureAuthenticated, async (req, res, next) => {
        let doc
        try {
            const {destination, boat, departure, user} = req.body
            doc = await Trip.createChecked(destination, boat, departure, user)
        } catch (err) {
            res.status(400).json({error: err.message}).end()
            return
        }

        let savedTrip
        try {
            savedTrip = await doc.save()
        } catch (err) {
            console.log(err)
            res.status(500).end()
            return
        }
        res.json(savedTrip)
        next()
    })

    router.get('/trip/find/:tripId', ensureAuthenticated, async (req, res, next) => {
        try {
            const {tripId} = req.params
            res.json(await Trip.get(tripId))
        } catch (err) {
            res.status(400).json({error: err.message}).end()
            return
        }
        next()
    })

    router.get('/trip/findByName/:tripName', ensureAuthenticated, async (req, res, next) => {
        try {
            const {tripName} = req.params
            res.json(await Trip.getByName( tripName))
        } catch (err) {
            res.status(400).json({error: err.message}).end()
            return
        }
        next()
    })

    router.delete('/trip/delete/:tripId', ensureAuthenticated, async (req, res, next) => {
        try {
            const {tripId} = req.params
            await Trip.remove(tripId)
            res.json({})
        } catch (err) {
            res.status(400).json({error: err.message}).end()
            return
        }
        next()
    })
    return router
}
