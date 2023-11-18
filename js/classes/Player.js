class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }

        // velocidade inicial 0
        this.velocity = {
            x: 0,
            y: 0
        }

        this.width = 100;
        this.height = 100;

        this.sides = {
            bottom: this.position.y + this.height,
        }

        // gravidade definida como 1
        this.gravity = 1;
    }

    draw() {
        c.fillStyle = 'lightpink';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        // posicões em x e y mudam a partir das velocidades
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.sides.bottom = this.position.y + this.height;

        // manter acima do chão do canvas 
        if (this.sides.bottom + this.velocity.y < canvas.height) {
            // caso esteja dentro do canvas, velocidade aumenta de acordo com gravidade
            this.velocity.y += this.gravity;
        } else {
            // senao, velocidade recebe 0
            this.velocity.y = 0;
        }
    }
}