import express from 'express'
import { createServer } from 'http'
import IO from 'socket.io'

import api from './api'

const app = express().use(api)
const http = createServer(app)
const io = IO(http)

io.on('connect', socket => {
	console.log('Connect')
	
	socket.on('disconnect', () => {
		console.log('Disconnect')
	})
})

;(async () => {
	const port = process.env.PORT ?? 5000
	http.listen(port, () => console.log(`Listening on port ${port}`))
})()
