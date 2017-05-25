class Cloud {
    constructor() {
    	this.speed = - width / 2000 - width / 200 * Math.random()
    	this.pos = {
    		x: width * 1.5 + width * Math.random(),
    		y: Math.random() * height
    	}
    	this.size = Math.random() * 100 + 30
    }

    draw() {
    	translate(this.pos.x - width / 2, this.pos.y - height / 2)
    	plane(this.size, this.size)
        translate(-(this.pos.x - width / 2), -(this.pos.y - height / 2))
    }

    update(deltaT) {
    	this.pos.x += this.speed * deltaT
    }
}
