/*jshint node: true, esversion: 6, asi: true*/
/*globals background, createCanvas, document, resizeCanvas, rect, rectMode, CENTER, width, height, keyCode, WEBGL, window, fill, translate, setTimeout, mouseX, mouseY, text, textSize, loadImage, image, imageMode */

var Bird = require('./scr/bird.js')

var gravity = 0.1

var prevTime

var state = "Dead"

var bird = new Bird()

function preload() {
	bird.sprite = loadImage("assets/TrashyDove1.png")
	menu.sprite = loadImage("assets/play-button.png")
}

function setup() {
	createCanvas(document.body.offsetWidth, document.body.offsetHeight)
	rectMode(CENTER)
	imageMode(CENTER)
	init()
	prevTime = window.performance.now()
}

function init() {
	menu.pos.x = width / 2
	menu.pos.y = height / 2
	menu.size.x = width / 6
	menu.size.y = width / 6
}

function draw() {

	background('#35e052')

	if (state === "Run") {
		update()

		if (bird.collides()) {
			die()
		}
	}

	if (state === "Dead") {
		menu.draw()
	}

	bird.draw()

	prevTime = window.performance.now()
}

function update() {
	var elapsedTime = window.performance.now() - prevTime
	var targetTime = 16
	var deltaT = elapsedTime / targetTime
	var acc = gravity / bird.mass
	bird.vel.y += acc * deltaT
	bird.pos.y += bird.vel.y * deltaT
}

function die() {
	state = "Dead"
	console.log(bird)
}

function live() {
	state = "Run"
	bird.reset()
}

var menu = {
	pos: {
		x: 0,
		y: 0
	},
	size: {
		x: 0,
		y: 0
	},
	sprite: null,
	draw: function () {
		if (this.hover()) {
			image(this.sprite, this.pos.x, this.pos.y, this.size.x * 1.2, this.size.y * 1.2)
		} else {
			image(this.sprite, this.pos.x, this.pos.y, this.size.x, this.size.y)
		}
	},
	hover: function () {
		if (mouseX < this.pos.x + this.size.x / 2 && mouseX > this.pos.x - this.size.x / 2 &&
			mouseY < this.pos.y + this.size.y / 2 && mouseY > this.pos.y - this.size.y / 2) {
			return true
		} else return false
	}
}

function click() {
	if (state === "Run") bird.jump()
	if (state === "Dead") {
		if (menu.hover()) live()
	}
}

function keyPressed() {
	if (state === "Run") bird.jump()
}

function mousePressed() {
	click()
}

function touchStarted() {
	click()
}

function windowResized() {
	resizeCanvas(document.body.offsetWidth, document.body.offsetHeight)
	init()
}
