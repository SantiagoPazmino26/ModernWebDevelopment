import './import_paths'

import mongoose from 'mongoose'
import express, {Router} from 'express'
import bodyParser from "body-parser"
const https = require('https');
const fs = require('fs');
const cors = require('cors')



import {initAuth, authApi} from 'backend/auth'
import {meApi, userApi, boatApi, destinationApi, tripApi} from 'backend/controllers'

async function main() {
    await mongoose.connect('mongodb://localhost/address-book')

    const routes = new Router()
    routes.use(authApi())
    routes.use(meApi())
    routes.use(boatApi())
    routes.use(tripApi())
    routes.use(destinationApi())
    routes.use(userApi())



    const app = express()
    initAuth(app)

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS, PUT');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, auth");
        res.header("Access-Control-Expose-Headers", "auth");
        next();
    });

    app.use(bodyParser.json())

    app.use('/api', routes)
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    https.createServer({
        key: fs.readFileSync(__dirname + '/logbook.key'),
        cert: fs.readFileSync(__dirname + '/logbook.crt')
    }, app).listen(3000, function(){
        console.log("My https server listening on port :3000");
    });

    //app.listen(3000)
    //console.log('listening on :3000')
}

main()
