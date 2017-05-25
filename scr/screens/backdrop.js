class Backdrop extends Screen {
    constructor() {
    	super()
    	this.sprite = createGraphics(1, 1)
    	this.sprite.background(255)
		this.clouds = []
	    this.addCloud()
	    let bd = this
	    this.spawner = setInterval(function() {
	        bd.addCloud()
	    }, 1000)

    }
    updateGraphics(deltaT) {
	    
	    //cull
        this.clouds = this.clouds.filter(function(cloud) {
            return cloud.pos.x + cloud.size > -width / 2
        })

	    this.clouds.forEach(function(cloud) {
	        cloud.update(deltaT)
	    })

    }
    draw() {
	    //Use a better way to optimize
	    texture(this.sprite)
	    this.clouds.forEach(function(cloud) {
	        cloud.draw()
	    })

    }
    addCloud() {
		this.clouds.push(new Cloud())
    }
}
