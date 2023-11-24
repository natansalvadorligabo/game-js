class Player {
    constructor({
        collisionBlocks = [],
    }) {
        this.position = {
            x: 200, // mudança da posicao de spawn
            y: 200
        }

        // velocidade inicial 0
        this.velocity = {
            x: 0,
            y: 0
        }

        this.width = 25;
        this.height = 25;

        this.sides = {
            bottom: this.position.y + this.height,
        }

        // gravidade definida como 1
        this.gravity = 1;

        this.collisionBlocks = collisionBlocks;
    }

    draw() {
        c.fillStyle = 'black';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        // posicões em x e y mudam a partir das velocidades
        this.position.x += this.velocity.x;
        // checando se tem colisao horizontal
        this.checkForHorizontalCollisions();    
        // aplicando gravidade
        this.applyGravity();
        // checando se tem colisao vertical
        this.checkForVerticalCollisions();

        /* bloco onde era aplicada a gravidade 
        e checava colisao do chão do canvas nao tem mais necessidade */
    }

    checkForHorizontalCollisions(){
        for(let i = 0; i < this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i];

            // se a colisao existir
            if (
                this.position.x <= collisionBlock.position.x + collisionBlock.width && 
                this.position.x + this.width >= collisionBlock.position.x && 
                this.position.y + this.height >= collisionBlock.position.y &&
                this.position.y <= collisionBlock.position.y + collisionBlock.height
                ){
                // se a colisao no eixo x for enquanto estiver indo para a esquerda
                if(this.velocity.x < 0){
                    this.position.x = collisionBlock.position.x + collisionBlock.width + 0.01;
                    break;
                }
                // se a colisao no eixo x for enquanto estiver indo para a direita
                if(this.velocity.x > 0){
                    this.position.x = collisionBlock.position.x - this.width - 0.01;
                    break;
                }
            }
        }
    }
    
    applyGravity(){
        this.velocity.y += this.gravity;
        this.position.y += this.velocity.y;
    }

    checkForVerticalCollisions(){
        for(let i = 0; i < this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i];

            // se a colisao existir
            if (
                this.position.x <= collisionBlock.position.x + collisionBlock.width && 
                this.position.x + this.width >= collisionBlock.position.x && 
                this.position.y + this.height >= collisionBlock.position.y && 
                this.position.y <= collisionBlock.position.y + collisionBlock.height
                ){
                // se a colisao no eixo y for enquanto estiver indo para cima
                if(this.velocity.y < 0){
                    this.velocity.y = 0;
                    this.position.y = collisionBlock.position.y + collisionBlock.height + 0.01;
                    break;
                }
                // se a colisao no eixo y for enquanto estiver indo para baixo
                if(this.velocity.y > 0){
                    this.velocity.y = 0;
                    this.position.y = collisionBlock.position.y - this.height - 0.01;
                    break;
                }
            }
        }
    }
}