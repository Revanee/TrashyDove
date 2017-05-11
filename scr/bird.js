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
			x: 0.1,
			y: 0.1
		}
		this.hitbox = {
			offset: 0.02,
			pos: {
				x: () => {
					return this.pos.x + this.hitbox.offset
				},
				y: () => {
					return this.pos.y + this.hitbox.offset
				}
			},
			size: {
				x: () => {
					return this.size.x - this.hitbox.offset
				},
				y: () => {
					return this.size.y - this.hitbox.offset
				}
			}
		}
		this.jumpPower = 0.02
		this.gravity = 0.0015
		this.sprite = sprites.bird.idle
		this.animationTimeout
	}

	update(deltaT) {
		this.vel.y += this.gravity * deltaT
		this.pos.y += this.vel.y * deltaT
	}

	draw() {
		imageMode(CORNER)

		push()

		translate(this.pos.x * width, this.pos.y * height)
		rotate(this.vel.y * 10 - 0.1)
		image(this.sprite, 0, 0, this.size.x * width, this.size.y * height)

		pop()
	}

	jump() {
		this.vel.y = -this.jumpPower
		this.sprite = sprites.bird.flying

		let bird = this
		setTimeout(function () {
			bird.sprite = sprites.bird.idle
		}, 100)
	}

	collides(tubes) {
		let collided = false
		if (this.pos.y < 0 || this.pos.y > 1) collided = true

		let bird = this
		tubes.forEach(function (tube) {
			if (bird.hitbox.pos.x() + bird.hitbox.size.x() > tube.pos.x && bird.hitbox.pos.x() < tube.pos.x + tube.size.x) {
				if (bird.hitbox.pos.y() < tube.pos.y - tube.hole || bird.hitbox.pos.y() + bird.hitbox.size.y() > tube.pos.y + tube.hole) {
					collided = true
				}
			}
		})

		return collided
	}
}
