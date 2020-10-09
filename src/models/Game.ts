import Player, { PlayerData } from './Player'
import Cell from '../Maze/Cell'

const games: Record<string, Game> = {}

export default class Game {
	players: Player[] = []
	
	constructor(public id: string, public cells: Cell[][]) {
		games[id] = this
	}
	
	static get = (id: string): Game | null =>
		games[id] ?? null
	
	get playerData() {
		return this.players.reduce((acc, { id, color, x, y }) => {
			if (color && !(x === null || y === null))
				acc[id] = { color, x, y }
			
			return acc
		}, {} as Record<string, PlayerData>)
	}
	
	addPlayer = (player: Player) =>
		this.players.push(player)
	
	removePlayer = (player: Player) =>
		this.players = this.players.filter(({ id }) => id !== player.id)
	
	emitPlayers = () => {
		const { players, playerData } = this
		
		for (const player of players)
			player.socket.emit('players', playerData)
	}
}
