import { Router } from 'express'
import bodyParser from 'body-parser'
import { nanoid } from 'nanoid'

import { ID_LENGTH } from './constants'
import { get, set } from './redis'
import Maze from './Maze'

const router = Router()

router.use(bodyParser.json())

router.get('/games/:id', async ({ params: { id } }, res) => {
	try {
		const value = await get(`games:${id}`)
		
		value
			? res.json(JSON.parse(value))
			: res.sendStatus(404)
	} catch (error) {
		res.status(500).json(error)
	}
})

router.post('/games', async ({ body: { rows, columns } }, res) => {
	try {
		if (!(
			typeof rows === 'number' &&
			typeof columns === 'number' &&
			rows > 0 &&
			columns > 0
		)) {
			res.sendStatus(400)
			return
		}
		
		const id = nanoid(ID_LENGTH)
		
		await set(
			`games:${id}`,
			JSON.stringify(new Maze(rows, columns).generate())
		)
		
		res.send(id)
	} catch (error) {
		res.status(500).json(error)
	}
})

export default router
