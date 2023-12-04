// criacao de arquivo separado para os eventListeners das teclas

// evento para quando tecla é apertada ('keydown')
window.addEventListener('keydown', (event) => {
    // evita o player movimentar enquanto estiver entrando na porta
    if (player.preventInput) return 
    switch (event.key) {
        case 'w':
            for (let i = 0; i < doors.length; i++) {
                const door = doors[i]

                // se o player estiver entre a largura da porta
                if (player.hitbox.position.x + player.hitbox.width <= door.position.x + door.width &&
                    player.hitbox.position.x >= door.position.x &&
                    player.hitbox.position.y + player.hitbox.height >= door.position.y &&
                    player.hitbox.position.y <= door.position.y + door.height) {
                        player.velocity.x = 0
                        player.velocity.y = 0
                        player.preventInput = true
                        player.switchSprite("enterDoor")
                        door.play()
                        return
                }
            }
            if (player.velocity.y === 0){
                player.velocity.y = -25;
            }
            break;
        case 'a':
            keys.a.pressed = true;
            break;
        case 'd':
            keys.d.pressed = true;
            break;
        
    }
});

// evento para quando tecla é solta ('keyup')
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'a':
            keys.a.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
        
    }
});