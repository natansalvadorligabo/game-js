const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

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

const player = new Player();

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
    window.requestAnimationFrame(animate);

    // adicionando background do level 1
    backgroundLevel1.draw()

    // adiciona colisão para cada bloco do mapa
    collisionBlocks.forEach(collisionBlock => {
        collisionBlock.draw()
    })

    // velocidade inicial do player no eixo x = 0, caso tecla 'd' ou 'a' apertadas, velocidade = 5
    player.velocity.x = 0;
    if (keys.d.pressed){
        player.velocity.x = 5;
    }else{
        if(keys.a.pressed){
            player.velocity.x = -5;
        }
    }
    
    player.draw();
    player.update();
}

animate();
