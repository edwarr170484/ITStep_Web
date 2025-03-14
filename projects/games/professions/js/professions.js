class Pair {
    constructor(id, man, job) {
        this.id = id;
        this.man = man;
        this.job = job;
    }
}

class Element {
    constructor(pair, prop) {
        this.pair = pair;
        this.image = pair[prop];

        this.variant = document.createElement('div');
        this.variant.classList.add('variant');
        this.variant.innerHTML = pair[prop];
        this.variant.pair = pair;

        this.getCoords = () => {   
            let box = this.variant.getBoundingClientRect();
            
            return {
              top: box.top + window.scrollY,
              left: box.left + window.scrollX
            };
        }

        this.moveAt = (e, shiftX, shiftY) => {
            this.variant.style.left = e.pageX - shiftX + 'px';
            this.variant.style.top = e.pageY - shiftY + 'px';
        }

        this.initEventListeners();
    }
    
    getDom() {
        let dom = document.createElement('div');
        dom.classList.add('game-variant');
        dom.append(this.variant);

        return dom;
    }

    initEventListeners() {
        this.variant.ondragstart = function() {
            return false;
        }

        this.variant.onmousedown = (e) => {
            let coords = this.getCoords();
            let shiftX = e.pageX - coords.left;
            let shiftY = e.pageY - coords.top;

            this.variant.style.position = 'absolute';
            document.body.appendChild(this.variant);

            this.moveAt(e, shiftX, shiftY);

            this.variant.style.zIndex = 1000; 

            document.onmousemove = (e) => {
                this.moveAt(e, shiftX, shiftY);
            };

            this.variant.onmouseup = () => {
                document.onmousemove = null;
                this.variant.onmouseup = null;
            };
        }
    }
}

class Game {
    constructor(mans, jobs) {
        this.mans = mans;
        this.jobs = jobs;
        this.score = 0;
        this.variants = [];
    }

    init() {
        this.score = 0;
        this.drawCards(this.mans, document.getElementById('mans-cards'))
            .drawCards(this.jobs, document.getElementById('jobs-cards'));
    }

    drawCards(items, field) {
        items.forEach((item) => {
            field.append(item.getDom());

            this.variants.push(item.variant);
        });

        return this;
    }
}

let pairs = [
    new Pair(1, 1, 1),
    new Pair(2, 2, 2),
    new Pair(3, 3, 3),
    new Pair(4, 4, 4),
    new Pair(5, 5, 5),
    new Pair(6, 6, 6)
];

let mans = pairs.map((pair) => {
    return new Element(pair, 'man');
});

mans.shuffle();

let jobs = pairs.map((pair) => {
    return new Element(pair, 'job');
});

jobs.shuffle();

let game = new Game(mans, jobs);

game.init();