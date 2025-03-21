let settings = {
    total: 6,
    timeout: 2000
}

class Pair {
    constructor(id, man, job) {
        this.id = id;
        this.man = man;
        this.job = job;
    }
}

class Result {
    constructor() {
        this.man = null;
        this.job = null;
        this.score = 0;
        this.current = null;

        this.left = document.getElementById("game-left");
        this.right = document.getElementById("game-right");
        this.stars = document.getElementById("score");
    }

    getMan() {
        return this.man;
    }

    getJob() {
        return this.job;
    }

    setMan(man) {
        this.man = man;
        
        man.element.style.opacity = '0';
        man.element.style.zIndex = '-1';

        let inner = document.createElement("div");
        inner.classList.add("game-inner");
        inner.style.backgroundImage = `url('${man.image}')`;

        this.left.append(inner);
    }

    setJob(job) {
        this.job = job;

        job.element.style.opacity = '0';
        job.element.style.zIndex = '-1';

        let inner = document.createElement("div");
        inner.classList.add("game-inner");
        inner.style.backgroundImage = `url('${job.image}')`;

        this.right.append(inner);
    }

    compare() {
        if(this.man && this.job) {
            if(this.man.pair.id == this.job.pair.id){
                this.success();
            } else {
                this.error();
            }
        }
    }

    success() {
        this.score++;
        this.show('variant-success');

        setTimeout(() => {
            this.hide('variant-success');
            this.man.remove();
            this.job.remove();
            this.reset();

            if(this.score == settings.total) {
                game.over();
            }

            this.renderScore();
        }, settings.timeout);
    }

    error() {
        this.show('variant-error');

        this.current.back();
        this[this.current.type] = null;

        let column = this.current.type == 'man' ? 'left' : 'right';

        this[column].innerHTML = '';

        setTimeout(() => {
            this.hide('variant-error');
        }, settings.timeout);
    }

    show(id) {
        document.getElementById(id).classList.add("active");
        document.getElementById(id).classList.add("animate__animated");
        document.getElementById(id).classList.add("animate__bounceIn");
    }

    hide(id) {
        document.getElementById(id).classList.remove("active");
        document.getElementById(id).classList.remove("animate__animated");
        document.getElementById(id).classList.remove("animate__bounceIn");
    }

    renderScore() {
        let star = document.createElement('img');
        star.src="img/free-icon-star-1985836.png";

        star.classList.add("animate__animated");
        star.classList.add("animate__heartBeat");

        this.stars.append(star);
    }

    reset() {
        this.man = null;
        this.job = null;
        this.current = null;

        this.left.innerHTML = '';
        this.right.innerHTML = '';
    }
}

class Element {
    constructor(pair, prop) {
        this.pair = pair;
        this.image = pair[prop];
        this.type = prop;

        this.element = document.createElement('div');
        this.element.classList.add('variant');
        this.element.style.backgroundImage = `url('${pair[prop]}')`;

        this.parent = document.createElement('div');
        this.parent.classList.add('game-variant');
        this.parent.append(this.element);

        this.coords = [];

        this.initEventListeners();
    }

    getCoords() {   
        let box = this.element.getBoundingClientRect();
        
        return {
          top: box.top + window.scrollY,
          left: box.left + window.scrollX
        };
    }

    moveAt(e, shiftX, shiftY) {
        this.element.style.left = e.pageX - shiftX + 'px';
        this.element.style.top = e.pageY - shiftY + 'px';
    }
    
    getDom() {
        return this.parent;
    }

    initEventListeners() {
        this.element.ondragstart = function() {
            return false;
        }

        this.element.onmousedown = (e) => {
            this.element.style.transition = 'none';
            let coords = this.getCoords();
            let shiftX = e.pageX - coords.left;
            let shiftY = e.pageY - coords.top;

            this.element.style.position = 'fixed';

            this.moveAt(e, shiftX, shiftY);

            this.element.style.zIndex = 1000; 

            document.onmousemove = (e) => {
                this.moveAt(e, shiftX, shiftY);
            };

            this.element.onmouseup = (e) => {
                document.onmousemove = null;
                this.element.onmouseup = null;

                if(this.inZone(e)) {
                    game.result.current = this;

                    switch(this.type) {
                        case 'man':
                            if(!game.result.getMan()) {
                                game.result.setMan(this);
                            } else {
                                this.back();
                            }
                        break;

                        case 'job':
                            if(!game.result.getJob()) {
                                game.result.setJob(this);
                            } else {
                                this.back();
                            }
                            
                        break;
                    }

                    game.result.compare();
                } else {
                    this.back();
                }
            };
        }
    }

    inZone(e) {
        return e.clientX > game.zone.left && e.clientX < game.zone.right;
    }

    back() {
        this.element.style.opacity = '1';
        this.element.style.zIndex = '5';
        this.element.style.transition = 'all 0.3s linear';
        this.element.style.left = this.coords.left + 'px';
        this.element.style.top = this.coords.top + 'px';
    }

    remove() {
        this.element.remove();
    }
}

class Game {
    constructor() {
        this.pairs = [];
        this.mans = [];
        this.jobs = [];
        this.variants = [];
        this.result = new Result();
        this.zone = null;
    }

    init() {
        this.pairs = [
            new Pair(1, 'img/mans/air.png', 'img/jobs/air.png'),
            new Pair(2, 'img/mans/art.png', 'img/jobs/art.png'),
            new Pair(3, 'img/mans/desant.png', 'img/jobs/desant.png'),
            new Pair(4, 'img/mans/doc.png', 'img/jobs/doc.png'),
            new Pair(5, 'img/mans/sea.png', 'img/jobs/sea.png'),
            new Pair(6, 'img/mans/tank.png', 'img/jobs/tank.png')
        ];
        
        this.mans = this.pairs.map((pair) => {
            return new Element(pair, 'man');
        });
        
        this.mans.shuffle();
        
        this.jobs = this.pairs.map((pair) => {
            return new Element(pair, 'job');
        });
        
        this.jobs.shuffle();

        this.score = 0;
        this.drawCards(this.mans, document.getElementById('mans-cards'))
            .drawCards(this.jobs, document.getElementById('jobs-cards'));

        this.zone = document.getElementById("game-zone").getBoundingClientRect();
    }

    drawCards(items, field) {
        items.forEach((item, index) => {
            field.append(item.getDom());
            items[index].coords = item.getCoords();

            this.variants.push(item.variant);
        });

        return this;
    }

    over() {
        document.getElementById("game-over").classList.add("active");
    }
}

let game = new Game();

game.init();