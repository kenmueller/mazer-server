import { Router } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { nanoid } from 'nanoid'

import { ID_LENGTH } from './constants'
import Game from './models/Game'
import Maze from './Maze'

const router = Router()

router.use(cors())
router.use(bodyParser.json())

router.get('/games/:id', ({ params: { id } }, res) => {
	const game = Game.get(id)
	
	game
		? res.json(game.cells)
		: res.sendStatus(404)
})

router.post('/games', ({ body: { rows, columns } }, res) => {
	if (!(
		typeof rows === 'number' &&
		typeof columns === 'number' &&
		rows > 0 &&
		columns > 0
	)) {
		res.sendStatus(400)
		return
	}
	
	res.send(new Game(
		nanoid(ID_LENGTH),
		new Maze(rows, columns).generate()
	).id)
})

export default router
