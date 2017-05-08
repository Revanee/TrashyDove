/*jshint node: true, esversion: 6, asi: true*/
/*global image, width, height, sprites*/

module.exports = class Bird {
	constructor() {
		this.pos = {
			x: 0.2,
			y: 0.3
		}
		this.vel = {
			x: 0,
			y: 0
		}
		this.size = {
			x: 0.05,
			y: 0.1
		}
		this.jumpPower = 0.03
		this.gravity = 0.002
	}

	update(deltaT) {
		this.vel.y += this.gravity * deltaT
		this.pos.y += this.vel.y * deltaT

		//		this.pos = {
		//			x: mouseX / width,
		//			y: mouseY / height
		//		}
	}

	draw() {
		imageMode(CORNER)
		image(sprites.bird, this.pos.x * width, this.pos.y * height, this.size.x * width, this.size.y * height)
	}

	jump() {
		this.vel.y = -this.jumpPower
	}

	collides(tubes) {
		let collided = false
		if (this.pos.y < 0 || this.pos.y > 1) collided = true

		let bird = this
		tubes.forEach(function (tube) {
			if (bird.pos.x + bird.size.x > tube.pos.x && bird.pos.x < tube.pos.x + tube.size.x) {
				if (bird.pos.y < tube.pos.y - tube.hole || bird.pos.y + bird.size.y > tube.pos.y + tube.hole) {
					collided = true
				}
			}
		})

		return collided
	}
}
