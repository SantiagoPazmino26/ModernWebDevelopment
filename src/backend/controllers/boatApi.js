import {Router} from 'express'

import ensureAuthenticated from 'backend/util/ensureAuthenticated'
import Boat from "backend/entities/Boat"

export default function boatApi() {
    const router = new Router()

    router.use(ensureAuthenticated)

    router.get('/boat', ensureAuthenticated, (req, res) => {
        res.json(req.user)
    })

    router.get('/boat/all', ensureAuthenticated, async (req, res, next) => {
        try {
            const boats = await Boat.list()
            res.json({boats})
        } catch (err) {
            res.status(500).json({error: 'internal server error'}).end()
            return
        }
        next()
    })

    router.post('/boat/new', ensureAuthenticated, async (req, res, next) => {
        let doc
        try {
            const {boat} = req.body
            doc = await Boat.createChecked(boat)
        } catch (err) {
            res.status(400).json({error: err.message}).end()
            return
        }

        let savedBoat
        try {
            savedBoat = await doc.save()
        } catch (err) {
            console.log(err)
            res.status(500).end()
            return
        }
        res.json(savedBoat)
        next()
    })

    router.get('/boat/find/:boatId', ensureAuthenticated, async (req, res, next) => {
        try {
            const {boatId} = req.params
            res.json(await Boat.get( boatId))
        } catch (err) {
            res.status(400).json({error: err.message}).end()
            return
        }
        next()
    })

    router.get('/boat/findByName/:boatName', ensureAuthenticated, async (req, res, next) => {
        try {
            const {boatName} = req.params
            res.json(await Boat.getByName( boatName))
        } catch (err) {
            res.status(400).json({error: err.message}).end()
            return
        }
        next()
    })

    router.delete('/boat/delete/:boatId', ensureAuthenticated, async (req, res, next) => {
        try {
            const {boatId} = req.params
            await Boat.remove(boatId)
            res.json({})
        } catch (err) {
            res.status(400).json({error: err.message}).end()
            return
        }
        next()
    })
    return router
}
