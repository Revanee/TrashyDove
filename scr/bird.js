/*jshint node: true, esversion: 6, asi: true*/
/*global image, width, height, sprites*/

class Bird {
	constructor() {
		this.pos = {
			x: -width / 4,
			y: -height / 4
		}
		this.vel = {
			x: 0,
			y: 0
		}
		this.size = ((height + width) / 2) / 10
		this.hitbox = {
			offset: this.size * 0.8,
			pos: {
				x: () => {
					return this.pos.x + this.hitbox.offset
				},
				y: () => {
					return this.pos.y + this.hitbox.offset
				}
			},
			size: () => {
				return this.size - this.hitbox.offset
			}
		}
		this.gravity = height / 700
		this.jumpPower = this.gravity * 12
		this.sprite = sprites.bird.idle
		this.animationTimeout = 100
	}

	update(deltaT) {
		this.vel.y += this.gravity * deltaT
		this.pos.y += this.vel.y * deltaT
	}

	draw() {
		imageMode(CORNER)

		push()

		translate(this.pos.x, this.pos.y)
		rotateZ((-this.vel.y / this.jumpPower) / 2)
		specularMaterial(0, 0, 0, 0)
		texture(this.sprite)
		_renderer.GL.texParameterf( _renderer.GL.TEXTURE_2D, _renderer.GL.TEXTURE_MAG_FILTER, _renderer.GL.NEAREST)
		plane(this.size, this.size.y)

		pop()
	}

	jump() {
		this.vel.y = -this.jumpPower
		this.sprite = sprites.bird.flying

		let bird = this
		setTimeout(function () {
			bird.sprite = sprites.bird.idle
		}, this.animationTimeout)
	}

	collides(tubes) {
		let collided = false
		if (this.hitbox.pos.y() < -height / 2 || this.hitbox.pos.y() - this.hitbox.size() > height / 2) collided = true

		let bird = this
		tubes.forEach(function (tube) {
			if (bird.hitbox.pos.x() + bird.hitbox.size() > tube.pos.x && bird.hitbox.pos.x() < tube.pos.x + tube.size) {
				if (bird.hitbox.pos.y() < tube.pos.y - tube.hole || bird.hitbox.pos.y() + bird.hitbox.size() > tube.pos.y + tube.hole) {
					collided = true
				}
			}
		})

		return collided
	}
}
