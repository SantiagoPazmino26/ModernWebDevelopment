import {Router} from 'express'

import ensureAuthenticated from 'backend/util/ensureAuthenticated'
import Destination from "backend/entities/Destination"

export default function destinationApi() {
    const router = new Router()

    router.use(ensureAuthenticated)

    router.get('/destination', ensureAuthenticated, (req, res) => {
        res.json(req.user)
    })

    router.get('/destination/all', ensureAuthenticated, async (req, res, next) => {
        try {
            const destinations = await Destination.list()
            res.json({destinations})
        } catch (err) {
            res.status(500).json({error: 'internal server error'}).end()
            return
        }
        next()
    })

    router.post('/destination/add', ensureAuthenticated, async (req, res, next) => {
        let doc
        try {
            const {name, code} = req.body
            doc = await Destination.createChecked(name, code)
        } catch (err) {
            res.status(400).json({error: err.message}).end()
            return
        }

        let savedDestination
        try {
            savedDestination = await doc.save()
        } catch (err) {
            console.log(err)
            res.status(500).end()
            return
        }
        res.json(savedDestination)
        next()
    })

    router.get('/destination/find/:destinationId', ensureAuthenticated, async (req, res, next) => {
        try {
            const destinationId = req.params
            res.json(await Destination.get( destinationId))
        } catch (err) {
            res.status(400).json({error: err.message}).end()
            return
        }
        next()
    })

    router.get('/destination/findByName/:boatName', ensureAuthenticated, async (req, res, next) => {
        try {
            const {destiantionName} = req.params
            res.json(await Destination.getByName( destiantionName))
        } catch (err) {
            res.status(400).json({error: err.message}).end()
            return
        }
        next()
    })

    router.delete('/destination/delete/:destinationId', ensureAuthenticated, async (req, res, next) => {
        try {
            const {destinationId} = req.params
            await Destination.remove(destinationId)
            res.json({})
        } catch (err) {
            res.status(400).json({error: err.message}).end()
            return
        }
        next()
    })
    return router
}
