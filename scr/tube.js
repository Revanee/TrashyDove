/*jshint node: true, esversion: 6, asi: true*/
/*global image, width, height, sprites, imageMode, CORNER*/

class Tube {
    constructor() {
        this.passed = false
        this.speed = width / 100
        this.hole = Math.random() * (height / 3 - bird.size) + bird.size
        this.size = ((height + width) / 2) / 5
        this.hitbox = {
            offset: 1,
            pos: {
                x: () => {
                    return this.pos.x - (this.size / 2) * this.hitbox.offset
                },
                y: () => {
                    return this.pos.y - (this.size / 2) * this.hitbox.offset
                }
            },
            size: () => {
                return this.size * this.hitbox.offset
            }
        }
        this.pos = {
            y: Math.random() * height - height / 2 + 50,
            x: width / 2 + this.size
        }
    }

    collides(hitbox) {
        if (hitbox.pos.x + hitbox.size > this.hitbox.pos.x() && hitbox.pos.x < this.hitbox.pos.x() + this.hitbox.size()) {
            if (hitbox.pos.y < this.hitbox.pos.y() - this.hole || hitbox.pos.y + hitbox.size > this.hitbox.pos.y() + this.hole) {
                return true
            } else return false
        } else return false
    }

    //not in use
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
