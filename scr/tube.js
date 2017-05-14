/*jshint node: true, esversion: 6, asi: true*/
/*global image, width, height, sprites, imageMode, CORNER*/

class Tube {
	constructor() {
		this.passed = false
		this.speed = width / 100
		this.hole = Math.random() * (height / 3 - bird.size) + bird.size
		this.size = ((height + width) / 2) / 5
		this.pos = {
			y: Math.random() * height - height / 2 + 50,
			x: width / 2 + this.size
		}
	}

	draw() {

		texture(sprites.tube.body)
		for (let i = 1; i < 10; i++) {
			push()
			translate(this.pos.x, this.pos.y - this.hole - this.size - this.size * i)
			plane(this.size, this.size)
			pop()
		}
		for (let i = 1; i < 10; i++) {
			push()
			translate(this.pos.x, this.pos.y + this.hole + this.size * i)
			plane(this.size, this.size)
			pop()
		}

		texture(sprites.tube.top)
		push()
		translate(this.pos.x, this.pos.y - this.hole - this.size)
		plane(this.size, this.size)
		pop()

		texture(sprites.tube.bottom)
		push()
		translate(this.pos.x, this.pos.y + this.hole)
		plane(this.size, this.size)
		pop()


		//old
		/*
		for (let i = 1; i < 10; i++) {
			image(sprites.tube.body, width * this.pos.x, (this.pos.y - this.hole - 0.1 - 0.1 * i) * height, this.size.x * width, 0.1 * height)
		}
		image(sprites.tube.top, width * this.pos.x, (this.pos.y - this.hole - 0.1) * height, this.size.x * width, 0.1 * height)
		image(sprites.tube.bottom, width * this.pos.x, (this.pos.y + this.hole) * height, this.size.x * width, 0.1 * height)
		for (let i = 1; i < 10; i++) {
			image(sprites.tube.body, width * this.pos.x, (this.pos.y + this.hole + 0.1 * i) * height, this.size.x * width, 0.1 * height)
		}
		*/
	}

	update(deltaT) {
		this.pos.x -= this.speed * deltaT
	}
}
