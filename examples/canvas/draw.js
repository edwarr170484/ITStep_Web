const COLUMN_WIDTH = 50;
const COLUMN_GAP = 50;
const GRAPTH_HEIGHT = 500;
const GRAPH_OFFSET = 50;

let stat = [
    {
        name: 'Java',
        value: 50,
        color: 'red'
    },
    {
        name: 'PHP',
        value: 30,
        color: 'blue'
    },
    {
        name: 'Javascript',
        value: 40,
        color: 'green'
    },
];

let canvas = document.getElementById("example");
let ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.moveTo(GRAPH_OFFSET, 20);
ctx.lineTo(GRAPH_OFFSET, GRAPTH_HEIGHT);
ctx.lineTo(700, GRAPTH_HEIGHT);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(GRAPH_OFFSET, 20);
ctx.lineTo(45, 35);
ctx.lineTo(55, 35);
ctx.fill();

ctx.beginPath();
ctx.moveTo(700, GRAPTH_HEIGHT);
ctx.lineTo(685, 495);
ctx.lineTo(685, 505);
ctx.fill();

ctx.font = '20px sans-serif';
ctx.fillText("Популярность", 55, 40);
ctx.fillText("Языки", 650, 520);

stat.forEach(function(item, key) {
    ctx.fillStyle = item.color;
    let height = (item.value * GRAPTH_HEIGHT) / 100;
    let y = GRAPTH_HEIGHT - height;
    let x = 50 + COLUMN_GAP + (key * (COLUMN_WIDTH + COLUMN_GAP));

    ctx.fillRect(x, y, COLUMN_WIDTH, height);
    ctx.font = '20px sans-serif';
    ctx.fillText(item.value + '%', x + 5, y - 5);
    ctx.fillStyle = 'white';
    ctx.font = '16px sans-serif';

    ctx.save();
    ctx.translate(x + 30, y + (height / 2));
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(item.name, 0, 0);
    ctx.restore();
});

class Triangle 
{
    constructor(x, y, katet1, katet2, color = null)
    {
        this.x = x;
        this.y = y;
        this.katet1 = katet1;
        this.katet2 = katet2;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x + this.katet1, this.y);
        ctx.lineTo(this.x, this.y);
        ctx.lineTo(this.x, this.y - this.katet2);
        ctx.lineTo(this.x + this.katet1, this.y);

        if(this.color) {
            ctx.fillStyle = this.color;
            ctx.fill();
        } else {
            ctx.stroke();
        }         
    }
}

canvas.onclick = function(event) {
    console.log(event);

    let t = new Triangle(200, 300, 30, 40, 'green');
    let t1 = new Triangle(400, 200, 100, 100);
    
    t.draw();
    t1.draw();
}

