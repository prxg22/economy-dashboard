import express from 'express'
import bodyparser from 'body-parser'

import { Database as database, ErrorHandler } from './helpers'
import routes from './routes'

const app = express()

const port = process.env.PORT || 3000

const init = async () => {
    try {
        await database.connect()
    } catch (e) {
        console.error(e)
        return
    }

    app.use(bodyparser.urlencoded({ extended: true }))
    app.use(bodyparser.json())
    app.use(routes)
    app.use(ErrorHandler)

    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })
}

init()
