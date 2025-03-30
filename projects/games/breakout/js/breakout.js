const COLORS = ['red', 'cyan', 'yellow', 'green', 'blue', 'black'];

class Game {
    constructor() {
        this.element = document.getElementById("game");
        
        this.borders = {
            left: 0,
            top: 0,
            right: this.element.width,
            bottom: this.element.height
        }

        this.ctx = this.element.getContext("2d");
        this.ball = new Ball();
        this.racket = new Racket();
        this.isOver = false;
        this.bricks = [];
        this.brickRows = 1;
        this.brickColumns = 8;
        this.brickGap = 3;
        this.score = 0;
    }

    init() {
        let brickWidth = Math.floor((this.element.width - (this.brickGap * (this.brickColumns + 1))) / this.brickColumns) + 0.6;
        let brickHeight = 20;

        for(let i = 0; i < this.brickRows; i++) {
            for(let j = 0; j < this.brickColumns; j++) {
                let x = j * (brickWidth + this.brickGap) + this.brickGap;
                let y = i * (brickHeight + this.brickGap) + this.brickGap;

                this.bricks.push(new Brick(x, y, brickWidth, brickHeight));
            }
        }

        this.bricks.forEach((brick) => brick.draw(this.ctx));

        this.ball.draw(this.ctx);
        this.racket.draw(this.ctx);

        document.body.addEventListener('keydown', (e) => {
            if(e.code == 'ArrowLeft') {
                this.racket.move('left');
            }

            if(e.code == 'ArrowRight') {
                this.racket.move('right');
            }
        });

        this.update();
    }

    update() {
        if(!game.isOver) {
            game.ctx.clearRect(0, 0, game.element.width, game.element.height);
            
            game.bricks.forEach((brick) => brick.draw(game.ctx));

            game.ball.move(game.ctx);
            game.racket.draw(game.ctx);
            game.checkBallRacket();
            game.checkBallBrick();

            requestAnimationFrame(game.update);

            if(game.score == game.bricks.length) {
                setInterval(game.over, 500);
            }
        }
        
    }

    checkBallRacket() {
        if(this.ball.x >= this.racket.x && this.ball.x <= (this.racket.x + this.racket.width) && this.ball.y + this.ball.radius >= this.racket.y) {
            this.ball.direction.y = -this.ball.vy;
        }
    }

    checkBallBrick() {
        this.bricks = this.bricks.map((brick) => {
            if(this.ball.x >= brick.x && 
                this.ball.x <= brick.x + brick.width && 
                this.ball.y - this.ball.radius <= brick.y + brick.height && 
                brick.visible) {
                brick.visible = false;
                this.ball.direction.y = this.ball.vy;
                this.score++;
            }

            return brick;
        });
    }

    over() {
        this.isOver = true;
        document.getElementById("game-over").classList.add("active");
    }

    static random(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}

class Ball {
    constructor() {
        this.radius = 7;
        this.x = 300;
        this.y = 300;
        this.vx = 5;
        this.vy = 5;

        this.direction = {
            x: this.vx,
            y: -this.vy
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = '#edf5e1';
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.closePath();
    }

    move(ctx) {
        this.x += this.direction.x;
        this.y += this.direction.y;

        if((this.y + this.radius) >= game.borders.bottom) {
            this.direction.y = -this.vy;
            game.over();
        }

        if((this.y - this.radius) <= game.borders.top) {
            this.direction.y = this.vy;
        }

        if((this.x - this.radius) <= game.borders.left) {
            this.direction.x = this.vx;
        }

        if((this.x + this.radius) >= game.borders.right) {
            this.direction.x = -this.vx;
        }

        this.draw(ctx);
    }
}

class Racket {
    constructor(){
        this.width = 100;
        this.height = 8;
        this.vx = 15;
        this.x = 300;
        this.y = this.height;
        this.color = '#05386b';
    }

    draw(ctx) {
        this.y = game.borders.bottom - this.height;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    move(direction) {
        switch(direction) {
            case 'left':
                this.x -= this.vx;

                if(this.x <= 0) {
                    this.x = 0;
                }
            break;

            case 'right':
                this.x += this.vx;

                if(this.x + this.width >= game.borders.right) {
                    this.x = game.borders.right - this.width;
                }
            break;
        }
    }
}

class Brick {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = COLORS[Game.random(0, COLORS.length - 1)];
        this.visible = true;
    }

    draw(ctx) {
        if(this.visible) {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    setVisible(visible) {
        this.visible = visible;
    }
}

let game = new Game();
game.init();