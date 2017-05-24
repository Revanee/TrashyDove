class Game {
	constructor() {
		this.state = "Menu"
		this.tubes = []
		this.bird = new Bird()
		this.spawner
	}
	live() {
	    score = 0
	    this.tubes = []
	    this.state = "Playing"
	    this.bird = new Bird(sprites)

	    this.tubes.push(new Tube())
	    let g = this
	    this.spawner = setInterval(function() {
	        g.tubes.push(new Tube())
	    }, 2000)

	    init()

	    this.bird.jump()
	}
	update(deltaT) {
	    //TODO: use a better way for culling
	    if (this.tubes.length > 3) {
	        this.tubes.splice(0, 1)
	    }

        this.bird.update(deltaT)

        let g = this
        this.tubes.forEach(function(tube) {
            tube.update(deltaT)

            //score
            if (tube.pos.x + tube.size < g.bird.pos.x && !tube.passed) {
                tube.passed = true
                score++
                console.log(score)
            }
        })

        //check for death
        if (this.bird.collides(this.tubes)) {
            //handle death
            this.state = "Menu"
            this.bird.die()
            clearInterval(this.spawner)
            console.log("Score: " + score)
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
}