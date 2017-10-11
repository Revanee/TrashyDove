function drawNumber(num, size) {
    if (num < 0) {
        console.log('Drawing invalid number!')
        return -1
    }
    digits = num.toString().split('')
    digits = digits.map(function (val) {
        return Number(val)
    })

    if (digits.length === 1) {
        texture(sprites.numbers[digits[0]])
        plane((size / 2), size)
    } else {
        push()
        translate((-size + size / digits.length) / 2, 0)
        for (let i = 0; i < digits.length; i++) {
            texture(sprites.numbers[digits[i]])
            plane(size / digits.length, size * 2 / digits.length)
            translate(size / digits.length , 0)
        }
        pop()
    }
}