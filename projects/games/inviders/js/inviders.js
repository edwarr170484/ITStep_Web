let canvas = document.getElementById("game");
const CTX = canvas.getContext("2d");

class Alien 
{
    constructor(type) {
        this.matrix = aliens[type].matrix;
        this.color = aliens[type].color;
        
        this.position = {
            x: 0,
            y: 0
        }

        this.pixel = {
            width: 2,
            height: 2
        }
    }

    draw() {
        CTX.fillStyle = this.color;

        for(let i = 0; i < this.matrix.length; i++) {
            for(let j = 0; j < this.matrix[i].length; j++) {
                if(this.matrix[i][j] === 1) {
                    CTX.fillRect((j * this.pixel.width) + this.position.x, (i * this.pixel.height) + this.position.y, this.pixel.width, this.pixel.height);
                }
            }
        }
    }

    setPosition(x, y) {
        this.position.x = x;
        this.position.y = y;
    }

    width() {
        return this.matrix[0].length * this.pixel.width;
    }

    height() {
        return this.matrix.length * this.pixel.height;
    }
}

let rows = ['white', 'yellow', 'purple', 'pink'];

let y = 0;

rows.forEach((row) => {
    let x = 0;
    let alien = null;

    for(let i = 0;i < 15; i++) {
        alien = new Alien(row);
        alien.setPosition(x, y);
        alien.draw();

        x += alien.width() + 4;
    }

    y += alien.height() + 6;
});

let x = 0;
for(let i = 0;i < 15; i++) {
    let white = new Alien('white');
    white.setPosition(x, 0);
    white.draw();

    x += white.width() + 4;
}