class Menu {
    constructor(parent) {
        this.parent = parent
        this.pos = {
            x: 0,
            y: 0
        }
        this.getSize = function() {
            return ((height + width) / 2) / 3
        }
    }
    drawNumber(num) {
        if (!(num > 100 || num < 0)) {
            let leftNum = Math.floor(num / 10)
            let rightNum = num - leftNum * 10

            push()
            translate(this.getSize() / 4, 0)
            texture(sprites.numbers[rightNum])
            plane(this.getSize() / 2, this.getSize())

            translate(-this.getSize() / 2, 0)
            texture(sprites.numbers[leftNum])
            plane(this.getSize() / 2, this.getSize())
            pop()
        }
    }
    draw() {
        texture(sprites.menu.play)

        if (this.hover()) {
            plane(this.getSize() * 1.2, this.getSize() * 1.2)
        } else {
            //Draw play button
            plane(this.getSize(), this.getSize())

            //Draw best score
            push()
            texture(sprites.menu.best)
            if (isLandscape()) {
                translate(-this.getSize(), 0)
            } else {
                translate(0, -this.getSize())
            }
            plane(this.getSize(), this.getSize())
            this.drawNumber(this.parent.score.best)
            pop()

            //Draw last score
            push()
            if (isLandscape()) {
                translate(this.getSize(), 0)
            } else {
                translate(0, this.getSize())
            }
            texture(sprites.menu.last)
            plane(this.getSize(), this.getSize())
            this.drawNumber(this.parent.score.last)
            pop()
        }
    }
    hover() {
        if (mouseX < width / 2 + this.getSize() / 2 && mouseX > width / 2 - this.getSize() / 2 &&
            mouseY < height / 2 + this.getSize() / 2 && mouseY > height / 2 - this.getSize() / 2) {
            return true
        } else return false
    }
    update(deltaT) {

    }
    mousePressed() {
        if (this.hover()) this.parent.live()
    }
    keyPressed() {
        this.parent.live()
    }
}
