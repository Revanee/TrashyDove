class Cloud {
    constructor() {
    	this.sprite = createGraphics(1, 1)
    	this.sprite.background(255)
    	this.speed = - width / 2000 - width / 200 * Math.random()
    	this.pos = {
    		x: width + width * Math.random(),
    		y: Math.random() * height
    	}
    	this.size = Math.random() * 100 + 30
    }

    draw() {
    	push()
    	translate(this.pos.x - width / 2, this.pos.y - height / 2)
    	plane(this.size, this.size)
    	pop()
    }

    update(deltaT) {
    	this.pos.x += this.speed * deltaT
    }
}
