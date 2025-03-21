
class Card {
    constructor(id, image) {
        this.id = id;
        this.image = image;
        this.element = this.createElement();
    }

    createElement() {
        let dom = {
            card: document.createElement('div'),
            inner: document.createElement('div'),
            front: document.createElement('div'),
            back : document.createElement('div')
        };

        dom.card.classList.add('flip-card');
        dom.inner.classList.add('flip-card-inner');
        dom.front.classList.add('flip-card-front');
        dom.back.classList.add('flip-card-back');
        dom.back.innerHTML = this.image;

        dom.inner.append(dom.front);
        dom.inner.append(dom.back);

        dom.card.append(dom.inner);

        dom.card.onclick = () => {
            this.check();
        };

        return dom.card;
    }

    dom() {
        return this.element;
    }

    check() {
        this.element.classList.add('flipped');

        game.check(this);
    }

    back() {
        this.element.classList.remove('flipped');
    }

    remove() {
        this.element.onclick = null;
        this.element.classList.add('disabled');
    }
}

class Game {
    constructor() {
        this.cards = [];
        this.result = {
            first: null,
            second: null
        }
        this.score = 0;
    }

    init() {
        for(let j = 0; j < 2; j++) {
            for(let i = 1; i <= 10; i++) {
                this.cards.push(new Card(i, i));
            }
        }

        this.cards.shuffle();

        this.drawCards();
    }

    drawCards() {
        let game = document.getElementById('game');

        this.cards.forEach((card) => {
            game.append(card.dom());
        });
    }

    check(card) {
        if(!this.result.first) {
            this.result.first = card;

            return;
        } 

        if(!this.result.second) {
            this.result.second = card;
        }

        setTimeout(() => {
            if(this.result.first && this.result.second) {
                if(this.result.first.id == this.result.second.id) {
                    this.result.first.remove();
                    this.result.second.remove();
                    this.score++;

                    if(this.score == 10) {
                        this.over();
                    }
                } else {
                    this.result.first.back();
                    this.result.second.back();
                }
    
                this.reset();
            }
        }, 1000);
    }

    reset() {
        this.result = {
            first: null,
            second: null
        }
    }

    over() {
        document.getElementById("game-over").classList.add("active");
    }
}

let game = new Game();

game.init();