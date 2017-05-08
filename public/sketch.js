/*jshint node: true, esversion: 6, asi: true*/
/*globals background, createCanvas, document, resizeCanvas, rect, rectMode, CENTER, width, height, keyCode, WEBGL, window, fill, translate, setTimeout, mouseX, mouseY, text, textSize, loadImage, image, imageMode */

let Bird = require('./scr/bird.js')
let Tube = require('./scr/tube.js')

let prevTime

let state = "Menu"

let bird = new Bird()

let tubes = []

let sprites = {}

function preload() {
	sprites.bird = loadImage("assets/TrashyDove1.png")
	sprites.menu = loadImage("assets/play-button.png")
}

function setup() {
	createCanvas(document.body.offsetWidth, document.body.offsetHeight)
	imageMode(CENTER)
	init()
	prevTime = window.performance.now()

	tubes.push(new Tube())
}

function init() {
	menu.pos.x = width / 2
	menu.pos.y = height / 2
	menu.size.x = width / 6
	menu.size.y = width / 6
}

function draw() {

	background('#35e052')

	if (state === "Playing") {

		update()

		if (bird.collides(tubes)) {
			die()
		}

	}

	bird.draw()
	tubes.forEach(function (tube) {
		tube.draw()
	})

	if (state === "Menu") {
		menu.draw()
	}

	prevTime = window.performance.now()
}

function update() {
	let elapsedTime = window.performance.now() - prevTime
	let targetTime = 16
	let deltaT = elapsedTime / targetTime

	bird.update(deltaT)

	tubes.forEach(function (tube) {
		tube.update(deltaT)
	})
}

function die() {
	state = "Menu"
}

function live() {
	state = "Playing"
	bird = new Bird()
	tubes[0] = new Tube()

	bird.jump()
}

let menu = {
	pos: {
		x: 0,
		y: 0
	},
	size: {
		x: 0,
		y: 0
	},
	draw: function () {
		imageMode(CENTER)
		if (this.hover()) {
			image(sprites.menu, this.pos.x, this.pos.y, this.size.x * 1.2, this.size.y * 1.2)
		} else {
			image(sprites.menu, this.pos.x, this.pos.y, this.size.x, this.size.y)
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
	if (state === "Playing") bird.jump()
	if (state === "Menu") {
		if (menu.hover()) live()
	}
}


//Bloat
function keyPressed() {
	if (state === "Playing") bird.jump()
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
