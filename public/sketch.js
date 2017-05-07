/*jshint node: true, esversion: 6, asi: true*/
/*globals background, createCanvas, document, resizeCanvas, rect, rectMode, CENTER, width, height, keyCode, WEBGL, window, fill, translate, setTimeout, mouseX, mouseY, text, textSize, loadImage, image, imageMode */

var Bird = require('./scr/bird.js')

var jumpPower = 0
var weight = 0
var gravity = 0

var prevTime

var state = "Dead"

var bird = new Bird(weight)

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
	bird.pos.x = width / 8
	bird.pos.y = height / 8
	bird.size = {
		x: height / 10,
		y: height / 10
	}
	menu.pos.x = width / 2
	menu.pos.y = height / 2
	menu.size.x = width / 6
	menu.size.y = width / 6
	jumpPower = height / 30
	weight = height / 2000
	gravity = height / 1000
	bird.mass = weight
}

function draw() {

	background('#35e052')
		//translate(-width / 2, -height / 2)

	if (state === "Run") {
		update(window.performance.now() - prevTime)

		if (checkIfDead()) {
			die()
		}
	}

	if (state === "Dead") {
		menu.draw()
	}

	bird.draw()

}

function update(elapsedTime) {
	var targetTime = 16
	var delta = targetTime / elapsedTime
	var acc = gravity / bird.mass
	bird.vel.y += acc
	bird.pos.y += bird.vel.y
}

function checkIfDead() {
	if (bird.pos.y < 0 || bird.pos.y > height) return true
	else return false
}

function die() {
	state = "Dead"
	console.log(bird)
}

function live() {
	state = "Run"
	bird.pos.x = width / 4
	bird.pos.y = height / 4
	bird.vel.x = 0
	bird.vel.y = 0
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

function jump() {
	bird.vel.y = -jumpPower
}

function click() {
	if (state === "Run") jump()
	if (state === "Dead") {
		if (menu.hover()) live()
	}
}

function keyPressed() {
	if (state === "Run") jump()
}

function mouseClicked() {
	click()
}

function touchStarted() {
	click()
}

function windowResized() {
	resizeCanvas(document.body.offsetWidth, document.body.offsetHeight)
	init()
}
