const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "!#%$&*(){}:?><|/^~ASDFBRDSTJCFEMKLOP".split("");

const fontSize = 10;
const columns = canvas.width / fontSize;

let drops = [];
for (let i = 0; i < columns; i++) {
  drops[i] = 1;
}

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, .1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];

    ctx.fillStyle = "#0f0";
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    drops[i]++;

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
      drops[i] = 0;
    }
  }
}

setInterval(draw, 80);
