export default class Controls{
	constructor(key){
		this.key = key;
		this.dir = null;

		switch (this.key) {
			case 'ArrowUp':
				console.log('north dir')
				this.dir = 'n'
				return this.dir
			case 'ArrowRight':
				//console.log('e')
				this.dir = 'e'
				return this.dir
			case 'ArrowDown':
				console.log('s')
				this.dir = 's'
				return this.dir
			case 'ArrowLeft':
				//console.log('w')
				this.dir = 'w'
				return this.dir
			default:
				break
		}
	}
}