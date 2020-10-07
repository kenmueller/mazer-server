export default class UnionFind {
	private ids: number[]
	
	count: number
	
	constructor(size: number) {
		this.ids = new Array(size)
		this.count = size
		
		for (let i = 0; i < size; i++)
			this.ids[i] = i
	}
	
	isConnected = (a: number, b: number) =>
		this.find(a) === this.find(b)
	
	find = (i: number) =>
		this.ids[i]

	union = (a: number, b: number) => {
		const aId = this.find(a)
		const bId = this.find(b)
		
		if (aId === bId)
			return
		
		for (let i = 0; i < this.ids.length; i++)
			if (this.ids[i] === aId)
				this.ids[i] = bId
		
		this.count--
	}
}
