const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 64 * 16; // 1024
canvas.height = 64 * 9; // 576

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
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);

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
