class Player {
    constructor(name, image) {
        this.name = name;
        this.progress = [];
        this.progress.length = 9;
        this.progress.fill(0);

        this.image = image;
        this.steps = 0;
        this.stepsCounter = null;
        this.winMessage = document.createElement("div");
        this.winMessage.classList.add("game-winner");
    }

    move(i) {
        this.steps++;
        this.progress[i] = 1;
        this.updateDashbord();
    }

    createDashboard(className) {
        let dashboard = document.createElement("div");
        dashboard.classList.add("player-dashboard");
        dashboard.classList.add(className);

        let name = document.createElement("h2");
        name.innerText = this.name;
        dashboard.append(name);

        let stepsElement = document.createElement("div");
        let stepsLabel = document.createTextNode("Ходы:");
        stepsElement.append(stepsLabel);

        this.stepsCounter = document.createElement("span");
        this.stepsCounter.innerText = this.steps;
        stepsElement.append(this.stepsCounter);

        dashboard.append(stepsElement);
        stepsElement.after(this.winMessage);

        document.body.append(dashboard);
    }
    updateDashbord() {
        this.stepsCounter.innerText = this.steps;
    }
    winner(message) {
        setTimeout(() => {
            let selectedCells = [...document.getElementsByClassName(`${this.name}_selected`)];
            selectedCells.forEach(cell => cell.classList.add("winner-cell"));
        }, 0);

        this.winMessage.innerText = message;
    }
}

class Cell {
    constructor(position) {
        this.position = position;
    }
}

class Game {
    constructor(number) {
        this.wins = [
            "111000000",
            "000111000",
            "000000111",
            "100100100",
            "010010010",
            "001001001",
            "100010001",
            "001010100"
        ];
        this.cells = [];

        for (let i = 0; i < number; i++) {
            let cell = new Cell(i);
            this.cells.push(cell);
        }
    }

    check(player) {
        return this.wins.includes(player.progress.join(''));
    }
    stop() {
        let cells = [...document.getElementsByClassName("game-cell")];

        if (cells) {
            cells.forEach((cell) => { cell.onclick = null });
        }
    }
}

let game = new Game(9);
let player1 = new Player('Player1', 'cross.png');
let player2 = new Player('Player2', 'circle.png');
let currentPlayer = player1;
let field = document.getElementById("game");

player1.createDashboard("left");
player2.createDashboard("right");

game.cells.forEach((cell) => {
    let cellElement = document.createElement('div');
    cellElement.classList.add("game-cell");

    let cellClick = function (event) {
        event.target.onclick = null;
        event.target.classList.add(`${currentPlayer.name}_selected`);
        let img = new Image();
        img.src = 'img/' + currentPlayer.image;
        event.target.append(img);

        currentPlayer.move(cell.position);

        if (game.check(currentPlayer)) {
            currentPlayer.winner("Вы победили!!");
            game.stop();

        } else {
            currentPlayer = currentPlayer == player1 ? player2 : player1;
        }
    }

    cellElement.onclick = cellClick;

    field.append(cellElement);
});