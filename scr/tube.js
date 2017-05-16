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

		//not in use
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
	}

	drawTop() {
		push()
		translate(this.pos.x, this.pos.y - this.hole - this.size)
		plane(this.size, this.size)
		pop()
	}

	drawBody() {
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
	}

	drawBottom() {
		push()
		translate(this.pos.x, this.pos.y + this.hole)
		plane(this.size, this.size)
		pop()
	}

	update(deltaT) {
		this.pos.x -= this.speed * deltaT
	}
}
