class PlayerError extends Error {
    constructor(message) {
        super(message)
        this.name = 'PlayerError'
    }
}

class Player extends Sprite {
    constructor({ collisionBlocks = [], imageSrc, frameRate, animations, loop }) {
        super({ imageSrc, frameRate, animations, loop })
        this.position = {
            x: 200, // mudança da posicao de spawn
            y: 200
        }

        // velocidade inicial 0
        this.velocity = {
            x: 0,
            y: 0
        }

        this.sides = {
            bottom: this.position.y + this.height,
        }

        // gravidade definida como 1
        this.gravity = 1;

        this.collisionBlocks = collisionBlocks;
    }

    update() {
        try {
            // hitbox - caixa azul
            // c.fillStyle = 'rgba(0, 0, 255, 0.5)'
            // c.fillRect(this.position.x, this.position.y, this.width, this.height)

            // posicões em x e y mudam a partir das velocidades
            this.position.x += this.velocity.x

            // atualizando a hitbox
            this.updateHitbox()

            // checando se tem colisao horizontal
            this.checkForHorizontalCollisions()

            // aplicando gravidade
            this.applyGravity()

            // atualizando a hitbox
            this.updateHitbox()

            // contorno da hitbox
            // c.fillRect(
            //     this.hitbox.position.x,
            //     this.hitbox.position.y,
            //     this.hitbox.width,
            //     this.hitbox.height)

            // checando se tem colisao vertical
            this.checkForVerticalCollisions()

            /* bloco onde era aplicada a gravidade 
            e checava colisao do chão do canvas nao tem mais necessidade */

        } catch (error) {
            console.error("Ocorreu um erro durante a atualização do jogador: ", error);
        }
    }

    handleInput(keys) {
        try {
            // se o player estiver entrando na porta
            if (player.preventInput) return
            // velocidade inicial do player no eixo x = 0, caso tecla 'd' ou 'a' apertadas, velocidade = 5
            player.velocity.x = 0
            if (keys.d.pressed) {
                player.switchSprite("runRight")
                player.velocity.x = 5
                player.lastDirection = "right"
            } else if (keys.a.pressed) {
                player.switchSprite("runLeft")
                player.velocity.x = -5
                player.lastDirection = "left"
            } else {
                if (player.lastDirection === 'left') {
                    player.switchSprite("idleLeft")
                } else {
                    player.switchSprite("idleRight")
                }
            }
        } catch (error) {
            throw new PlayerError("Erro ao lidar com a entrada da porta")
        }
    }

    switchSprite(name) {
        try {
            if (this.image === this.animations[name].image) return
            this.currentFrame = 0
            this.image = this.animations[name].image
            this.frameRate = this.animations[name].frameRate
            this.frameBuffer = this.animations[name].frameBuffer
            this.loop = this.animations[name].loop
            this.currentAnimation = this.animations[name]
        } catch (error) {
            throw new PlayerError("Erro ao trocar a sprite do jogador")
        }
    }

    updateHitbox() {
        try {
            this.hitbox = {
                position: {
                    x: this.position.x + 58,
                    y: this.position.y + 34,
                },
                width: 50,
                height: 53,
            }
        } catch (error) {
            throw new PlayerError("Erro ao atualizar a hitbox")
        }
    }

    checkForHorizontalCollisions() {
        try {
            for (let i = 0; i < this.collisionBlocks.length; i++) {
                const collisionBlock = this.collisionBlocks[i];

                // se a colisao existir
                if (
                    this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
                    this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
                    this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
                    this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
                ) {
                    // se a colisao no eixo x for enquanto estiver indo para a esquerda
                    if (this.velocity.x < -0) {
                        const offset = this.hitbox.position.x - this.position.x
                        this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01;
                        break;
                    }
                    // se a colisao no eixo x for enquanto estiver indo para a direita
                    if (this.velocity.x > 0) {
                        const offset = this.hitbox.position.x - this.position.x + this.hitbox.width
                        this.position.x = collisionBlock.position.x - offset - 0.01;
                        break;
                    }
                }
            }
        } catch (error) {
            throw new PlayerError("Erro ao verificar colisões horizontais")
        }
    }

    applyGravity() {
        try {
            this.velocity.y += this.gravity;
            this.position.y += this.velocity.y;
        } catch (error) {
            throw new PlayerError("Erro ao aplicar gravidade")
        }
    }

    checkForVerticalCollisions() {
        try {
            for (let i = 0; i < this.collisionBlocks.length; i++) {
                const collisionBlock = this.collisionBlocks[i];

                // se a colisao existir
                if (
                    this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
                    this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
                    this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
                    this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
                ) {
                    // se a colisao no eixo y for enquanto estiver indo para cima
                    if (this.velocity.y < 0) {
                        this.velocity.y = 0;
                        this.position.y = collisionBlock.position.y + collisionBlock.height + 0.01;
                        break;
                    }
                    // se a colisao no eixo y for enquanto estiver indo para baixo
                    if (this.velocity.y > 0) {
                        this.velocity.y = 0;
                        const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
                        this.position.y = collisionBlock.position.y - offset - 0.01;
                        break;
                    }
                }
            }
        } catch (error) {
            throw new PlayerError("Erro ao verificar colisões verticais")
        }
    }
}