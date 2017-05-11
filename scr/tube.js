/*jshint node: true, esversion: 6, asi: true*/
/*global image, width, height, sprites*/

module.exports = class Tube {
	constructor() {
		this.speed = 0.003
		this.hole = 0.2
		this.pos = {
			y: Math.random(),
			x: 1
		}
		this.size = {
			x: 0.1
		}
	}

	draw() {
		fill(250, 200, 50)
		rectMode(CORNER)
		let offset = this.pos.y - parseInt(this.pos.y)
		for (let i = 1; i < 10; i++) {
			image(sprites.tube.body, width * this.pos.x, (this.pos.y - this.hole - 0.1 - 0.1 * i) * height, this.size.x * width, 0.1 * height)
		}
		image(sprites.tube.top, width * this.pos.x, (this.pos.y - this.hole - 0.1) * height, this.size.x * width, 0.1 * height)
		image(sprites.tube.bottom, width * this.pos.x, (this.pos.y + this.hole) * height, this.size.x * width, 0.1 * height)
		for (let i = 1; i < 10; i++) {
			image(sprites.tube.body, width * this.pos.x, (this.pos.y + this.hole + 0.1 * i) * height, this.size.x * width, 0.1 * height)
		}
	}

	update(deltaT) {
		this.pos.x -= this.speed
	}
}
