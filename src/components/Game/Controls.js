export default class Controls{
	constructor(key){
		this.key = key;
		this.dir = null;
		switch (this.key) {
			case 'ArrowUp':
				this.dir = 's'
				return this.dir
			case 'ArrowRight':
				this.dir = 'e'
				return this.dir
			case 'ArrowDown':
				this.dir = 'n'
				return this.dir
			case 'ArrowLeft':
				this.dir = 'w'
				return this.dir
			default:
				break
		}
	}
}