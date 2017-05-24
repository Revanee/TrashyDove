class Menu {
    constructor() {
        this.pos = {
            x: 0,
            y: 0
        }
        this.size = 0
        this.lastScore = 0
        this.bestScore = 0
    }
    drawNumber(num) {
        if (!(num > 100 || num < 0)) {
            let leftNum = Math.floor(num / 10)
            let rightNum = num - leftNum * 10

            push()
            translate(this.size / 4, 0)
            texture(sprites.numbers[rightNum])
            plane(this.size / 2, this.size)

            translate(-this.size / 2, 0)
            texture(sprites.numbers[leftNum])
            plane(this.size / 2, this.size)
            pop()
        }
    }
    draw() {
        texture(sprites.menu.play)

        if (this.hover()) {
            plane(this.size * 1.2, this.size * 1.2)
        } else {
            //Draw play button
            plane(this.size, this.size)

            //Draw best score
            push()
            texture(sprites.menu.best)
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
            texture(sprites.menu.last)
            plane(this.size, this.size)
            menu.drawNumber(score)
            pop()
        }
    }
    hover() {
        if (mouseX < width / 2 + this.size / 2 && mouseX > width / 2 - this.size / 2 &&
            mouseY < height / 2 + this.size / 2 && mouseY > height / 2 - this.size / 2) {
            return true
        } else return false
    }
    init() {
        menu.size = ((height + width) / 2) / 3
    }
}
