/*jshint node: true, esversion: 6, asi: true*/
/*global image, width, height, sprites*/

module.exports = class Tube {
	constructor() {
		this.speed = 0.003
		this.hole = 0.2
		this.pos = {
			y: 0.5,
			x: 0.7
		}
		this.size = {
			x: 0.1
		}
	}

	draw() {
		fill(250, 200, 50)
		rectMode(CORNER)
		rect(width * this.pos.x, 0, this.size.x * width, (this.pos.y - this.hole) * height)
		rect(width * this.pos.x, (this.pos.y + this.hole) * height, this.size.x * width, height)
	}

	update(deltaT) {
		this.pos.x -= this.speed
	}
}
