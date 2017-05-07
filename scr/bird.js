/*jshint node: true, esversion: 6, asi: true*/
/*global image*/

module.exports = class Bird {
	constructor() {

		this.pos = {
			x: 0.2,
			y: 0.2
		}
		this.vel = {
			x: 0,
			y: 0
		}
		this.size = {
			x: 50,
			y: 50
		}
		this.mass = 1
		this.sprite = null
		this.jumpPower = 0.03
	}

	draw() {
		image(this.sprite, this.pos.x * width, this.pos.y * height, this.size.x, this.size.y)
	}

	jump() {
		this.vel.y = -this.jumpPower
	}

	collides() {
		if (this.pos.y < 0 || this.pos.y > 1) return true
		else return false
	}

	reset() {
		this.pos = {
			x: 0.2,
			y: 0.2
		}
		this.vel = {
			x: 0,
			y: 0
		}
		this.size = {
			x: 50,
			y: 50
		}
		this.mass = 50
		this.jumpPower = 0.03
	}
}
