//declare time step variables
let oldTime
let elapsedTime

//declare assets
let sprites = {}
let sounds = {}

//declare screens
let backdrop
let menu
let game

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
    override()
    createCanvas(document.body.offsetWidth, document.body.offsetHeight, WEBGL)

    backdrop = new Backdrop()
    menu = new Menu()
    game = new Game()

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

    //draw elements

    background('#22e4f9')

    backdrop.draw()

    game.draw()

    if (game.state === "Menu") {
        menu.draw()
    }
}

//update game logic once every frame
function update() {
    let targetTime = 1000 / 60
    let deltaT = elapsedTime / targetTime

    backdrop.update(deltaT)

    if (game.state === "Playing") {
        game.update(deltaT)
    }
}

//controls
//TODO: make modular
function keyPressed() {
    if (game.state === "Playing") game.bird.jump()
}

function mousePressed() {
    if (game.state === "Playing") game.bird.jump()
    if (game.state === "Menu") {
        if (menu.hover()) game.live()
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
let override = function() {
    console.log('overriding')
    let _texture = texture
    texture = function(arg) {
        _texture(arg)
        _renderer.GL.texParameteri(_renderer.GL.TEXTURE_2D, _renderer.GL.TEXTURE_MAG_FILTER, _renderer.GL.NEAREST)
    }
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
