class Sprite {
    constructor(sprites) {
        this.sprites = sprites
        this.framerate = 24
        this.currentFrame = 0
    }

    play() {
        this.stop()
        this.animate = setInterval(() => {
            this.nextFrame()
        }, 1000 / this.framerate)
    }

    playOnce() {
        this.stop()
        this.animate = setInterval(() => {
            if (this.currentFrame === this.sprites.length - 1) this.stop()
            else this.nextFrame()
        }, 1000 / this.framerate)
    }

    stop() {
        clearInterval(this.animate)
        this.currentFrame = 0
    }

    nextFrame() {
        this.currentFrame++
        if (this.currentFrame >= this.sprites.length) this.currentFrame = 0
    }

    getImage() {
        return this.sprites[this.currentFrame]
    }
}