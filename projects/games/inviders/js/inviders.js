let canvas = document.getElementById("game");
const CTX = canvas.getContext("2d");

console.log(canvas);

const settings = {
    bulletSize: 2,
    aliensRows: ['white', 'yellow', 'purple', 'pink'],
    aliensColumns: 15
};
class Game {
    constructor() {
        this.ship = new Ship('ship');
        this.aliens = [];
        this.bullets = [];
        
        this.aliensSpeed = {
            x: 2,
            y: 9
        }

        this.aliensBlock = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }
        this.moveDown = false;

        let y = 0;

        settings.aliensRows.forEach((row) => {
            let x = 0;
            let alien = null;
            let tmp = [];
            
            this.aliensBlock.right = 0;

            for(let i = 0;i < settings.aliensColumns; i++) {
                alien = new Alien(row);
                alien.setPosition(x, y);

                x += alien.width() + 4;

                tmp.push(alien);

                this.aliensBlock.right += alien.width() + 4;
            }

            y += alien.height() + 6;

            this.aliens.push(tmp);

            this.aliensBlock.bottom += y;
        });
    }

    init() {
        this.drawAliens();

        this.ship.setPosition(300).draw();

        this.update();
    }

    drawAliens(){
        if(this.aliens) {
            this.aliens.forEach((row) => {
                row.forEach((alien) => {
                    if(!alien.destroyed) {
                        alien.draw();
                    }
                });
            });
        }
    }

    drawBullets() {
        if(this.bullets) {
            this.bullets.forEach((bullet) => {
                bullet.setPosition(bullet.position.x, bullet.position.y - settings.bulletSize);
                bullet.draw();
            });
        }
    }

    update() {
        CTX.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

        game.drawAliens();
        game.ship.draw();
        game.checkAliens();
        game.drawBullets();
        game.moveAliens();

        requestAnimationFrame(game.update);
    }

    moveAliens() {
        if(this.aliensBlock.right > canvas.clientWidth || this.aliensBlock.left < 0) {
            this.aliensSpeed.x *= -1;
            this.moveDown = true;
        } 

        if(this.aliens) {
            this.aliens.forEach((row) => {
                row.forEach((alien) => {
                    let x = alien.position.x + this.aliensSpeed.x;
                    let y = alien.position.y;
                    
                    if(this.moveDown) {
                        y += this.aliensSpeed.y;
                    }

                    alien.setPosition(x, y);
                });
            });
        }

        this.aliensBlock.left += this.aliensSpeed.x;
        this.aliensBlock.right += this.aliensSpeed.x;

        if(this.moveDown) {
            this.aliensBlock.bottom += this.aliensSpeed.y;
            this.moveDown = false;
        }
    }

    checkAliens() {
        let aliens = [];
        
        this.aliens.forEach((row) => {
            row.forEach((alien) => {
                aliens.push(alien);
            })
        });

        this.bullets.forEach((bullet) => {
            aliens.find((alien) => {
                if(bullet.position.x > alien.position.x && bullet.position.x <= alien.position.x + alien.width() && bullet.position.y < alien.position.y + alien.height() && !alien.destroyed && !bullet.destroyed) {
                    bullet.destroyed = true;
                    alien.destroyed = true;

                    return alien;
                }
            });
        });

        this.bullets = this.bullets.filter((bullet) => !bullet.destroyed);
    }
}

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

        this.destroyed = false;
    }

    draw() {
        if(!this.destroyed) {
            CTX.fillStyle = this.color;

            for(let i = 0; i < this.matrix.length; i++) {
                for(let j = 0; j < this.matrix[i].length; j++) {
                    if(this.matrix[i][j] === 1) {
                        CTX.fillRect((j * this.pixel.width) + this.position.x, (i * this.pixel.height) + this.position.y, this.pixel.width, this.pixel.height);
                    }
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

class Ship extends Alien {
    constructor(type) {
        super(type);

        document.body.addEventListener('keydown', (e) => {
            let position = this.position.x;

            if(e.code == 'ArrowLeft') {
                position = this.position.x - this.width();

                if(position <= 0 ) {
                    position = 0;
                }
            }

            if(e.code == 'ArrowRight') {
                position = this.position.x + this.width();

                if(position >= canvas.clientWidth - this.width()) {
                    position = canvas.clientWidth - this.width();
                }
            }

            if(e.code == 'Space') {
                let bullet = new Bullet();

                bullet.setPosition(Math.floor(game.ship.position.x + (game.ship.width() / 2)), canvas.clientHeight - game.ship.height() - 2);

                game.bullets.push(bullet);
            }

            this.setPosition(position);
        });
    }

    setPosition(x) {
        this.position.x = x;
        this.position.y = canvas.clientHeight - this.height() - 10;
        
        return this;
    }
}

class Bullet {
    constructor() {
        this.position = {
            x: 0,
            y: 0
        }

        this.destroyed = false;
    }

    setPosition(x, y) {
        this.position.x = x;
        this.position.y = y;
    }

    draw() {
        if(!this.destroyed) {
            CTX.fillStyle = "#ffffff";
            CTX.beginPath();
            CTX.arc(this.position.x, this.position.y, settings.bulletSize, 0, 2 * Math.PI);
            CTX.fill();
        }
    }
}

let game = new Game();

game.init();