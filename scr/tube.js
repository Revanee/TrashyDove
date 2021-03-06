class Tube {
    constructor(parent) {
        this.parent = parent
        this.parent.tubesSpawned++
        this.passed = false
        this.speed = width / 100
        //Need to decide wether to keep same hole size or randomize
        this.hole = parent.bird.size * 1.2
        this.size = parent.bird.size * 2 //((height + width) / 2) / 4
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
            y: noise(this.parent.tubesSpawned) * (height - this.hole * 2) - (height / 2 - this.hole * 2),
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
        translate(this.pos.x, this.pos.y - this.hole - this.size)
        plane(this.size, this.size)
        translate(-this.pos.x, -(this.pos.y - this.hole - this.size))
    }

    drawBody() {
        for (let i = 1; i < 10; i++) {
            translate(this.pos.x, this.pos.y - this.hole - this.size - this.size * i)
            plane(this.size, this.size)
            translate(-this.pos.x, -(this.pos.y - this.hole - this.size - this.size * i))
        }
        for (let i = 1; i < 10; i++) {
            translate(this.pos.x, this.pos.y + this.hole + this.size * i)
            plane(this.size, this.size)
            translate(-this.pos.x, -(this.pos.y + this.hole + this.size * i))
        }
    }

    drawBottom() {
        translate(this.pos.x, this.pos.y + this.hole)
        plane(this.size, this.size)
        translate(-this.pos.x, -(this.pos.y + this.hole))
    }

    update(deltaT) {
        this.pos.x -= this.speed * deltaT
    }
}
