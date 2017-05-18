/*jshint node: true, esversion: 6, asi: true*/
/*globals background, createCanvas, document, resizeCanvas, rect, CENTER, width, height, keyCode, WEBGL, window, fill, setTimeout, mouseX, mouseY, text, textSize, loadImage, image, Bird, Tube, push, pop */

let oldTime
let elapsedTime

let state = "Menu"

let bird
let tubes = []
let sprites = {}
let sounds = {}

let spawner

let score

//load sprites
function preload() {
    sprites.bird = loadGif('assets/sprites/bird/TrashyDove.gif')
    sprites.tube = {
        top: loadImage('assets/sprites/tube/TubeTop.png'),
        bottom: loadImage('assets/sprites/tube/TubeBottom.png'),
        body: loadImage('assets/sprites/tube/TubeBody.png')
    }
    sprites.menu = loadImage('assets/sprites/play-button.png')

    sounds.tube = {
        hit: [loadSound('assets/sounds/tube/hit_1.flac')]
    }
    sounds.bird = {
        flap: [loadSound('assets/sounds/bird/flap_1.flac'),
            loadSound('assets/sounds/bird/flap_2.flac'),
            loadSound('assets/sounds/bird/flap_3.flac'),
            loadSound('assets/sounds/bird/flap_4.flac'),
        ]
    }
}

//initialize state of game
function setup() {
    createCanvas(document.body.offsetWidth, document.body.offsetHeight, WEBGL)
    bird = new Bird(sprites)
    init()
    oldTime = window.performance.now()
}

//main looping function, draw current frame
function draw() {

    //update time elapsed between frames
    elapsedTime = window.performance.now() - oldTime
    oldTime = window.performance.now()

    //update game logic
    if (state === "Playing") {
        update()
    }

    //splice
    if (tubes.length > 3) {
        tubes.splice(0, 1)
    }

    //draw elements
    push()

    background('#22e4f9')
    bird.draw()

    texture(sprites.tube.top)
    tubes.forEach(function(tube) {
        tube.drawTop()
    })

    texture(sprites.tube.body)
    tubes.forEach(function(tube) {
        tube.drawBody()
    })

    texture(sprites.tube.bottom)
    tubes.forEach(function(tube) {
        tube.drawBottom()
    })

    if (state === "Menu") {
        menu.draw()
    }

    pop()
}

//update game logic once every frame
function update() {
    let targetTime = 1000 / 60
    let deltaT = elapsedTime / targetTime

    bird.update(deltaT)

    tubes.forEach(function(tube) {
        tube.update(deltaT)

        //score
        if (tube.pos.x + tube.size < bird.pos.x && !tube.passed) {
            tube.passed = true
            score++
            console.log(score)
        }
    })

    //check for death
    if (bird.collides(tubes)) {
        //handle death
        state = "Menu"
        clearInterval(spawner)
        console.log("Score: " + score)
    }
}

//called on spawn
function live() {
    score = 0
    tubes = []
    state = "Playing"
    bird = new Bird(sprites)

    tubes.push(new Tube())
    spawner = setInterval(function() {
        tubes.push(new Tube())
    }, 2000)

    init()

    bird.jump()
}

//menu object
let menu = {
    pos: {
        x: 0,
        y: 0
    },
    size: 0,
    draw: function() {
        texture(sprites.menu)



        if (this.hover()) {
            plane(this.size * 1.2, this.size * 1.2)
        } else {
            plane(this.size, this.size)
        }
    },
    hover: function() {
        if (mouseX < width / 2 + this.size / 2 && mouseX > width / 2 - this.size / 2 &&
            mouseY < height / 2 + this.size / 2 && mouseY > height / 2 - this.size / 2) {
            return true
        } else return false
    }
}

//click
function click() {
    if (state === "Playing") bird.jump()
    if (state === "Menu") {
        if (menu.hover()) live()
    }
}

//controls
function keyPressed() {
    if (state === "Playing") bird.jump()
}

function mousePressed() {
    click()
}

function touchStarted() {
    click()
}

//allow resizing
function windowResized() {
    resizeCanvas(document.body.offsetWidth, document.body.offsetHeight)
    init()
}

//adjust sizes based on proportions
function init() {
    menu.size = ((height + width) / 2) / 3
}
