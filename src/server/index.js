import express from 'express'
import http from 'http'
import path from 'path'
import mongoose from 'mongoose'
import session from 'express-session'
import routes from './routes'

mongoose.connect('mongodb://localhost/react-tw')

const app = express()
const port = process.env.PORT || 8080
const server = http.Server(app)

const io = require('socket.io')(server)
export { io }

app.disable('etag')

// app.use(cookieParser());
app.use(session({secret: 'so secret', resave: false, saveUninitialized: true}))

app.use(function (req, res, next) {
  res.locals.session = req.session
  next()
})

app.get('/page/:page/:skip', routes.page)
app.get('/sessions/connect', routes.connect)
app.get('/sessions/callback', routes.callback)
app.get('/authorized', routes.authorized)
app.get('/credentials', routes.credentials)

app.use('/', express.static(path.join(__dirname, '/../')))

server.listen(port, () => {
  console.log('Express server listening on port ' + port)
})
