// converte um array unidimensional em um array bidimensional com 16 elementos em cada linha.
Array.prototype.parse2D = function () {
    const rows = []
    for (let i = 0; i < this.length; i += 16) {
        rows.push(this.slice(i, i + 16))
    }
    return rows
}

// cria objeto a partir de um array, e transforma em 2D.
Array.prototype.createObjetcsFrom2D = function () {
    const objects = []
    this.forEach((row, y) => {
        row.forEach((symbol, x) => {
            // se o símbolo for 292, cria um novo objeto CollisionBlock e o adiciona ao array.
            if (symbol === 292) {
                objects.push(
                    new CollisionBlock({
                        position: {
                            x: x * 64,
                            y: y * 64,
                        },
                    })
                )
            }
        })
    })

    return objects
}