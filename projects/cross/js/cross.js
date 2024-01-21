class Player {
    constructor(name, image) {
        this.name = name;
        this.progress = [];
        this.progress.length = 9;
        this.progress.fill(0);

        this.image = image;
        this.steps = 0;
    }

    move(i) {
        this.steps++;
        this.progress[i] = 1;
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
        if (this.wins.includes(player.progress.join(''))) {
            console.log(`${player.name} wins`);
        }
    }
}

let game = new Game(9);
let player1 = new Player('Player1', 'cross.png');
let player2 = new Player('Player2', 'circle.png');
let currentPlayer = player1;
let field = document.getElementById("game");

game.cells.forEach((cell) => {
    let cellElement = document.createElement('div');
    cellElement.classList.add("game-cell");

    cellElement.addEventListener("click", (event) => {
        if (!event.target.classList.contains("selected") && event.target.tagName != "IMG") {
            event.target.classList.add("selected");
            let img = new Image();
            img.src = 'images/' + currentPlayer.image;
            event.target.append(img);

            currentPlayer.move(cell.position);
            game.check(currentPlayer);

            currentPlayer = currentPlayer == player1 ? player2 : player1;
        }
    });
    field.append(cellElement);
});