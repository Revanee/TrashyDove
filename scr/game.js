class Game extends Screen {
    constructor() {
        super()
        this.tubes = []
        this.bird = new Bird()

        score.last = 0

        this.tubes.push(new Tube(this))
        let g = this
        this.spawner = setInterval(function() {
            g.tubes.push(new Tube(g))
        }, 2000)
        this.bird.jump()
    }
    updateLogic(deltaT) {

        //cull
        //TODO: Put in updateGraphics()
        this.tubes = this.tubes.filter(function(tube) {
            return tube.pos.x + tube.size > -width / 2
        })

        this.bird.update(deltaT)

        let g = this
        this.tubes.forEach(function(tube) {
            tube.update(deltaT)

            //score
            if (tube.pos.x + tube.size < g.bird.pos.x && !tube.passed) {
                tube.passed = true
                score.last++
            }
        })

        //check for death
        if (this.bird.collides(this.tubes)) {
            //handle death
            this.bird.die()

            //increase best score
            score.best = Math.max(score.best, score.last)

            //save
            localStorage.score = JSON.stringify(score)

            clearInterval(this.spawner)
            screens.push(new Menu(this))
        }

    }
    draw() {
        this.bird.draw()

        texture(sprites.tube.top)
        this.tubes.forEach(function(tube) {
            tube.drawTop()
        })

        texture(sprites.tube.body)
        this.tubes.forEach(function(tube) {
            tube.drawBody()
        })

        texture(sprites.tube.bottom)
        this.tubes.forEach(function(tube) {
            tube.drawBottom()
        })
    }
    mousePressed() {
        this.bird.jump()
    }
    keyPressed() {
        this.bird.jump()
    }
}
