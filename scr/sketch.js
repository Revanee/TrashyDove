let oldTime
let elapsedTime

let state = "Menu"

let bird
let tubes = []
let clouds = []
let sprites = {}
let sounds = {}

let spawner

let score = 0

let landscape

//load sprites
function preload() {

    sprites.bird = loadGif('assets/sprites/bird/TrashyDove.gif')
    sprites.tube = {
        top: loadImage('assets/sprites/tube/TubeTop.png'),
        bottom: loadImage('assets/sprites/tube/TubeBottom.png'),
        body: loadImage('assets/sprites/tube/TubeBody.png')
    }
    sprites.menu = {
        play: loadImage('assets/sprites/play-button.png'),
        best: loadImage('assets/sprites/best.png'),
        last: loadImage('assets/sprites/last.png')
    }
    sprites.numbers = [loadImage('assets/sprites/numbers/0.png'),
        loadImage('assets/sprites/numbers/1.png'),
        loadImage('assets/sprites/numbers/2.png'),
        loadImage('assets/sprites/numbers/3.png'),
        loadImage('assets/sprites/numbers/4.png'),
        loadImage('assets/sprites/numbers/5.png'),
        loadImage('assets/sprites/numbers/6.png'),
        loadImage('assets/sprites/numbers/7.png'),
        loadImage('assets/sprites/numbers/8.png'),
        loadImage('assets/sprites/numbers/9.png'),
    ]
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

    clouds.push(new Cloud())
    setInterval(function() {
        clouds.push(new Cloud())
    }, 1000)

    init()

    oldTime = window.performance.now()
}

//main looping function, draw current frame
function draw() {
    //update time elapsed between frames
    elapsedTime = window.performance.now() - oldTime
    oldTime = window.performance.now()

    //update game logic
    update()

    //splice arrays
    //TODO: use a better way for culling
    if (tubes.length > 3) {
        tubes.splice(0, 1)
    }
    if (clouds.length > 100) {
        clouds.splice(0, 1)
    }

    //draw elements

    background('#22e4f9')

    clouds.forEach(function(cloud) {
        cloud.draw()
    })

    bird.draw()

    _texture(sprites.tube.top)
    tubes.forEach(function(tube) {
        tube.drawTop()
    })

    _texture(sprites.tube.body)
    tubes.forEach(function(tube) {
        tube.drawBody()
    })

    _texture(sprites.tube.bottom)
    tubes.forEach(function(tube) {
        tube.drawBottom()
    })

    if (state === "Menu") {
        menu.draw()
    }
}

//update game logic once every frame
function update() {
    let targetTime = 1000 / 60
    let deltaT = elapsedTime / targetTime

    clouds.forEach(function(cloud) {
        cloud.update(deltaT)
    })

    if (state === "Playing") {
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
            bird.die()
            clearInterval(spawner)
            console.log("Score: " + score)
        }
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
    lastScore: 0,
    bestScore: 0,
    drawNumber: function(num) {
        if (!(num > 100 || num < 0)) {
            leftNum = Math.floor(num / 10)
            rightNum = num - leftNum * 10

            push()
            translate(this.size / 4, 0)
            _texture(sprites.numbers[rightNum])
            plane(this.size / 2, this.size)

            translate(-this.size / 2, 0)
            _texture(sprites.numbers[leftNum])
            plane(this.size / 2, this.size)
            pop()
        }
    },
    draw: function() {
        _texture(sprites.menu.play)

        if (this.hover()) {
            plane(this.size * 1.2, this.size * 1.2)
        } else {
            //Draw play button
            plane(this.size, this.size)

            //Draw best score
            push()
            _texture(sprites.menu.best)
            if (landscape) {
                translate(-this.size, 0)
            } else {
                translate(0, -this.size)
            }
            plane(this.size, this.size)
            menu.drawNumber(13)
            pop()

            //Draw last score
            push()
            if (landscape) {
                translate(this.size, 0)
            } else {
                translate(0, this.size)
            }
            _texture(sprites.menu.last)
            plane(this.size, this.size)
            menu.drawNumber(score)
            pop()
        }
    },
    hover: function() {
        if (mouseX < width / 2 + this.size / 2 && mouseX > width / 2 - this.size / 2 &&
            mouseY < height / 2 + this.size / 2 && mouseY > height / 2 - this.size / 2) {
            return true
        } else return false
    },
    init: function() {
        menu.size = ((height + width) / 2) / 3
    }
}

//controls
function keyPressed() {
    if (state === "Playing") bird.jump()
}

function mousePressed() {
    if (state === "Playing") bird.jump()
    if (state === "Menu") {
        if (menu.hover()) live()
    }
}

//allow resizing
function windowResized() {
    resizeCanvas(document.body.offsetWidth, document.body.offsetHeight)
    init()
}

//adjust sizes based on proportions
function init() {
    menu.init()
    if (width > height) landscape = true
    else landscape = false
}

//Override library functions

//Disable texture filtering for textures
let _texture = function(arg) {
    texture(arg)
    _renderer.GL.texParameteri(_renderer.GL.TEXTURE_2D, _renderer.GL.TEXTURE_MAG_FILTER, _renderer.GL.NEAREST)
}

//Disable auto_play for gifs
let loadGif = function(url, cb) {
    var gif = new SuperGif({
        gif: url,
        p5inst: this,
        auto_play: false
    })

    gif.load(cb)

    var p5graphic = gif.buffer()

    p5graphic.play = gif.play
    p5graphic.pause = gif.pause
    p5graphic.playing = gif.get_playing
    p5graphic.frames = gif.get_frames
    p5graphic.totalFrames = gif.get_length

    p5graphic.loaded = function() {
        return !gif.get_loading()
    }

    p5graphic.frame = function(num) {
        if (typeof num === 'number') {
            gif.move_to(num)
        } else {
            return gif.get_current_frame()
        }
    }

    return p5graphic
}
