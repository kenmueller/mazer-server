import UnionFind from './UnionFind'
import Cell from './Cell'
import Wall from './Wall'

export default class Maze {
	private rows: number
	private columns: number
	
	private walls: Wall[]
	private cells: Cell[][]
	
	constructor(rows: number, columns: number) {
		this.rows = rows
		this.columns = columns
		
		this.walls = new Array(2 * rows * columns - rows - columns)
		this.cells = [...new Array(rows)].map(() => new Array(columns))
		
		let wallIndex = 0
		
		for (let row = 0; row < rows; row++)
			for (let column = 0; column < columns; column++) {
				this.cells[row][column] = { up: true, right: true, down: true, left: true }
				
				if (row < rows - 1)
					this.walls[wallIndex++] = { row, column, isHorizontal: true }
				
				if (column < columns - 1)
					this.walls[wallIndex++] = { row, column, isHorizontal: false }
			}
	}
	
	private createOpenings = () => {
		this.cells[0][0].left = false
		this.cells[this.rows - 1][this.columns - 1].right = false
	}
	
	generate = () => {
		const unions = new UnionFind(this.rows * this.columns)
		
		this.createOpenings()

		while (unions.count > 1) {
			const { row, column, isHorizontal } = this.walls[Math.floor(Math.random() * this.walls.length)]
			
			const a = row * this.columns + column
			const b = isHorizontal
				? (row + 1) * this.columns + column
				: row * this.columns + column + 1
			
			if (unions.isConnected(a, b))
				continue
			
			if (isHorizontal) {
				this.cells[row][column].down = false
				this.cells[row + 1][column].up = false
			} else {
				this.cells[row][column].right = false
				this.cells[row][column + 1].left = false
			}

			unions.union(a, b)
		}
		
		return this.cells
	}
}
