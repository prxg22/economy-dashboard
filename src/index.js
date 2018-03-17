'use strict'

import express from 'express'
import bodyparser from 'body-parser'

import { Database } from './helpers'
import routes from './routes'

const app = express()
const database = new Database()

const port = process.env.PORT || 3000


const init = async () => {
    try {
        await database.connect()
    } catch(e) {
        console.error(e)
        return exit(-1)
    }

    app.use(bodyparser.urlencoded({extended: true}))
    app.use(bodyparser.json())

    Object.keys(routes).forEach(router => app.use('/' + router.toLowerCase(), routes[router]))

    console.log(app._router)
    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })
}

init()
