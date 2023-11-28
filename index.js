const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 64 * 16; // 1024
canvas.height = 64 * 9; // 576

// adiciona as colisões do mapa 1
const parsedCollisions = collisionLevel1.parse2D()
// adiciona as colisões dos blocos
const collisionBlocks = parsedCollisions.createObjetcsFrom2D()

// cria o sprite em um determinado nível
const backgroundLevel1 = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: './img/backgroundLevel1.png',
})

const player = new Player({
    collisionBlocks,     // mesma coisa que: collisionBlocks = collisionBlocks
    imageSrc: './img/king/idle.png', 
    frameRate: 11,
    animations: {
        idleRight: {
            frameRate: 11,
            frameBuffer: 2,
            loop: true,
            imageSrc: './img/king/idle.png', 
        },
        idleLeft: {
            frameRate: 11,
            frameBuffer: 2,
            loop: true,
            imageSrc: './img/king/idleLeft.png', 
        },
        runRight: {
            frameRate: 8,
            frameBuffer: 4,
            loop: true,
            imageSrc: './img/king/runRight.png', 
        },
        runLeft: {
            frameRate: 8,
            frameBuffer: 4,
            loop: true,
            imageSrc: './img/king/runLeft.png',
        },
        enterDoor: {
            frameRate: 8,
            frameBuffer: 4,
            loop: false,
            imageSrc: './img/king/enterDoor.png',
        },
    }
})

const doors = [
    new Sprite({
        position: {
            x: 767,
            y: 270,
        },
        imageSrc: "./img/doorOpen.png",
        frameRate: 5,
        frameBuffer: 5,
        loop: false,
        autoplay: false,
    }),
]

// criando objeto com as teclas de movimentacao do player, setando o atributo 'pressionado' como false
const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

function animate() {
    window.requestAnimationFrame(animate)

    // adicionando background do level 1
    backgroundLevel1.draw()

    // adiciona colisão para cada bloco do mapa
    collisionBlocks.forEach(collisionBlock => {
        collisionBlock.draw()
    })

    doors.forEach(door => {
        door.draw()
    })

    player.handleInput(keys)
    player.draw()
    player.update()
}

animate()
