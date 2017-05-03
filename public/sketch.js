/*jslint vars: true, plusplus: true, devel: true*/
/*globals background, createCanvas, document, resizeCanvas, rect, rectMode, CENTER, width, height, keyCode, WEBGL, window, fill, translate */

var jumpPower = 25;
var weight = 5;
var gravity = 9.8;

var prevTime;

function setup() {
	createCanvas(document.body.offsetWidth, document.body.offsetHeight, WEBGL);
	rectMode(CENTER);
	bird.pos.x = width / 4;
	bird.pos.y = height / 4;
	prevTime = window.performance.now();
}

function draw() {
	background('#35e052');
	translate(-width / 2, -height / 2);

	update(window.performance.now() - prevTime);
	if (checkIfDead()) {
		console.log("restarting");
		reset();
	}

	bird.draw();

}

function checkIfDead() {
	if (bird.pos.y < 0 || bird.pos.y > height) return true;
	else return false;
}

function reset() {
	window.alert("You died");
	bird.pos.x = width / 4;
	bird.pos.y = height / 4;
	bird.vel.x = 0;
	bird.vel.y = 0;
}

function update(elapsedTime) {
	var targetTime = 16;
	var delta = targetTime / elapsedTime;
	var acc = gravity / bird.mass;
	bird.vel.y += acc;
	bird.pos.y += bird.vel.y;
}

function keyPressed() {
	jump();
}

function mouseClicked() {
	jump();
}

function touchStarted() {
	jump();
}

function windowResized() {
	resizeCanvas(document.body.offsetWidth, document.body.offsetHeight);
}

function jump() {
	bird.vel.y = -jumpPower;
}

var bird = {
	pos: {
		x: 0,
		y: 0
	},
	vel: {
		x: 0,
		y: 0
	},
	size: {
		x: 50,
		y: 50
	},
	mass: weight,
	draw: function () {
		fill('#f4ce42');
		rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
	}
};
