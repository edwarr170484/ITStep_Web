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
    }

    getMan() {
        return this.man;
    }

    getJob() {
        return this.job;
    }

    setMan(man) {
        this.man = man;

        if(!this.job) {
            man.resetEventListeners();
            document.getElementById("game-left").append(man.element);
        }
    }

    setJob(job) {
        this.job = job;

        if(!this.man) {
            this.job.resetEventListeners();
            document.getElementById("game-right").append(this.job.element);
        }
    }

    compare() {
        if(this.man && this.job) {
            if(this.man.pair.id == this.job.pair.id){
                alert("Все верно!");
                this.score++;
                this.man.remove();
                this.job.remove();
                this.reset();

                if(this.score == settings.total) {
                    game.over();
                }
            } else {
                alert("Выберите другой вариант");
                this.current.back();
            }
        }
    }

    reset() {
        this.man = null;
        this.job = null;
        this.current = null;
    }
}

class Element {
    constructor(pair, prop) {
        this.pair = pair;
        this.image = pair[prop];
        this.type = prop;
        this.element = document.createElement('div');
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
        let dom = document.createElement('div');
        dom.classList.add('game-variant');

        this.element.classList.add('variant');
        this.element.innerHTML = this.image;

        dom.append(this.element);

        return dom;
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

            this.element.style.position = 'absolute';
            document.body.appendChild(this.element);

            this.moveAt(e, shiftX, shiftY);

            this.element.style.zIndex = 1000; 

            document.onmousemove = (e) => {
                this.moveAt(e, shiftX, shiftY);
            };

            this.element.onmouseup = () => {
                this.resetEventListeners();
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
            };
        }
    }

    resetEventListeners() {
        document.onmousemove = null;
        this.element.onmousedown = null;
        this.element.onmouseup = null;
    }

    back() {
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
    }

    init() {
        this.pairs = [
            new Pair(1, 1, 1),
            new Pair(2, 2, 2),
            new Pair(3, 3, 3),
            new Pair(4, 4, 4),
            new Pair(5, 5, 5),
            new Pair(6, 6, 6)
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