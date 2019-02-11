const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')

const { API_VERSIONS } = require('./constants')
const { DB_CONNECT_URL } = require('./utils')

// Initialize
const app = express()
mongoose.connect(DB_CONNECT_URL, { useNewUrlParser: true })

// Settings express project
app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

/**
 * Inititalize all api versions
 */
const initializeApiVersions = () => {
    API_VERSIONS.forEach(version => {
        version.routes.forEach(routeObj => {
            const endpoint = `/api/${version.key}/${routeObj.route}`
            // winston.log('info', `initializeApiVersions >> Exposing: ${endpoint}`)
            app.use(endpoint, routeObj.router)
        })
    })
}
initializeApiVersions()


// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    res.status(err.status || 500)
    res.send('error')
})

module.exports = app;