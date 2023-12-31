const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 64 * 16; // 1024
canvas.height = 64 * 9; // 576

// adiciona as colisões do mapa
let parsedCollisions
// adiciona as colisões dos blocos
let collisionBlocks
// cria o sprite em um determinado nível
let background
// configurações da porta
let doors
// configuração do personagem
const player = new Player({
    imageSrc: './assets/images/idle/idle.png',
    frameRate: 11,
    animations: {
        idleRight: {
            frameRate: 11,
            frameBuffer: 2,
            loop: true,
            imageSrc: './assets/images/idle/idle.png',
        },
        idleLeft: {
            frameRate: 11,
            frameBuffer: 2,
            loop: true,
            imageSrc: './assets/images/idle/idleLeft.png',
        },
        runRight: {
            frameRate: 8,
            frameBuffer: 4,
            loop: true,
            imageSrc: './assets/images/idle/runRight.png',
        },
        runLeft: {
            frameRate: 8,
            frameBuffer: 4,
            loop: true,
            imageSrc: './assets/images/idle/runLeft.png',
        },
        enterDoor: {
            frameRate: 8,
            frameBuffer: 4,
            loop: false,
            imageSrc: './assets/images/idle/enterDoor.png',
            onComplete: () => {
                // console.log("completed animation")
                gsap.to(overlay, {
                    opacity: 1,
                    onComplete: () => {
                        // muda de nível após completar a transição
                        level++

                        // recomeça o nível
                        if (level === 4) level = 1
                        levels[level].init()
                        player.switchSprite('idleRight')
                        player.preventInput = false
                        gsap.to(overlay, {
                            opacity: 0,
                        })
                    },
                })
            },
        },
    },
})

let level = 1
let levels = {
    1: {
        init: () => {
            // adiciona as colisões do mapa 1
            parsedCollisions = collisionLevel1.parse2D()
            // adiciona as colisões dos blocos
            collisionBlocks = parsedCollisions.createObjetcsFrom2D()
            player.collisionBlocks = collisionBlocks

            if (player.currentAnimation) {
                player.currentAnimation.isActive = false
            }

            // cria o sprite em um determinado nível
            background = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: './assets/images/maps/backgroundLevel1.png',
            })

            doors = [
                new Sprite({
                    position: {
                        x: 767,
                        y: 270,
                    },
                    imageSrc: "./assets/images/doors/doorOpen.png",
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false,
                }),
            ]
        },
    },
    2: {
        init: () => {
            // adiciona as colisões do mapa 2
            parsedCollisions = collisionLevel2.parse2D()
            // adiciona as colisões dos blocos
            collisionBlocks = parsedCollisions.createObjetcsFrom2D()
            player.collisionBlocks = collisionBlocks
            // spawn do personagem
            player.position.x = 96
            player.position.y = 140

            if (player.currentAnimation) {
                player.currentAnimation.isActive = false
            }

            // cria o sprite em um determinado nível
            background = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: './assets/images/maps/backgroundLevel2.png',
            })

            doors = [
                new Sprite({
                    position: {
                        x: 766,
                        y: 336,
                    },
                    imageSrc: "./assets/images/doors/door3.png",
                    loop: false,
                    autoplay: false,
                }),
            ]
        },
    },
    3: {
        init: () => {
            // adiciona as colisões do mapa 3
            parsedCollisions = collisionLevel3.parse2D()
            // adiciona as colisões dos blocos
            collisionBlocks = parsedCollisions.createObjetcsFrom2D()
            player.collisionBlocks = collisionBlocks
            // spawn do personagem
            player.position.x = 780
            player.position.y = 330

            if (player.currentAnimation) {
                player.currentAnimation.isActive = false
            }

            // cria o sprite em um determinado nível
            background = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: './assets/images/maps/backgroundLevel3.png',
            })

            doors = [
                new Sprite({
                    position: {
                        x: 460,
                        y: 337,
                    },
                    imageSrc: "./assets/images/doors/door2.png",
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false,
                }),
            ]
        },
    },
}

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

const overlay = {
    opacity: 0,
}

function animate() {
    window.requestAnimationFrame(animate)

    // mapas ou nível
    background.draw()

    // colisões para cada bloco do mapa
    // collisionBlocks.forEach(collisionBlock => {
    //     collisionBlock.draw()
    // })

    doors.forEach(door => {
        door.draw()
    })

    player.handleInput(keys)
    player.draw()
    player.update()

    // transição de mapas
    c.save()
    c.globalAlpha = overlay.opacity
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    c.restore()
}

levels[level].init()
animate()
