function drawNumber(num, size) {
    // if (!(num >= 100 || num < 0)) {
    //     let leftNum = Math.floor(num / 10)
    //     let rightNum = num - leftNum * 10

    //     push()
    //     translate(sizeX / 2, 0)
    //     texture(sprites.numbers[rightNum])
    //     plane(sizeX, sizeY)

    //     translate(-sizeX, 0)
    //     texture(sprites.numbers[leftNum])
    //     plane(sizeX, sizeY)
    //     pop()
    // }


    //new version
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