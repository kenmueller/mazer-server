import IO from 'socket.io'

import Game from './Game'

export interface PlayerData {
	color: string
	x: number
	y: number
}

export default class Player {
	private game: Game | null = null
	
	id: string
	color: string | null = null
	x: number | null = null
	y: number | null = null
	
	constructor(public socket: IO.Socket) {
		this.id = socket.id
		
		socket.emit('id', this.id)
		
		socket.on('game-id', gameId => {
			if (!(this.game = Game.get(gameId)))
				return // Couldn't find game
			
			this.game.addPlayer(this)
			this.game.emitPlayers()
		})
		
		socket.on('disconnect', () => {
			if (!this.game)
				return
			
			this.game.removePlayer(this)
			this.game.emitPlayers()
		})
	}
}
