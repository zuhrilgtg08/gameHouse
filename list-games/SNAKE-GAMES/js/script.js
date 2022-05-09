// bikin board canvas
const garisPapan = 'black';
const backgroundPapan = 'white';
const warnaUlar = 'yellow';
const garisBadanUlar = 'orange';

// tangkap canvasnya
const ularCanvas = document.getElementById('ularCanvas');
const canvasContext = ularCanvas.getContext('2d');

let ular = [{
        x: 200,
        y: 200
    },
    {
        x: 190,
        y: 200
    },
    {
        x: 180,
        y: 200
    },
    {
        x: 170,
        y: 200
    },
    {
        x: 160,
        y: 200
    },
];

let score = 0;
let changingDirection = false;

let foodThdSmx;
let foodThdSmy;
let directionX = 10;
let directionY = 0;

// mulai game game-start
main();

spawnFood();

document.addEventListener('keydown', changeDirection);

function main() {
    if (endGame()) return;

    changingDirection = false;
    setTimeout(function onTick() {
        papanKosong();
        makeFood();
        moveSnake();
        createSnake();

        // repeat-waktu
        main();
    }, 100);
}

function papanKosong() {
    canvasContext.fillStyle = backgroundPapan;
    canvasContext.strokestyle = garisPapan;
    canvasContext.fillRect(0, 0, ularCanvas.width, ularCanvas.height);
    canvasContext.strokeRect(0, 0, ularCanvas.width, ularCanvas.height);
}

function createSnake() {
    ular.forEach(createSnakePart);
}

function makeFood() {
    canvasContext.fillStyle = 'lightgreen';
    canvasContext.strokestyle = 'darkgreen';
    canvasContext.fillRect(foodThdSmx, foodThdSmy, 10, 10);
    canvasContext.strokeRect(foodThdSmx, foodThdSmy, 10, 10);
}

function createSnakePart(bagianUlar) {
    canvasContext.fillStyle = warnaUlar;
    canvasContext.strokestyle = garisBadanUlar;
    canvasContext.fillRect(bagianUlar.x, bagianUlar.y, 10, 10);
    canvasContext.strokeRect(bagianUlar.x, bagianUlar.y, 10, 10);
}

function endGame() {
    for (let i = 4; i < ular.length; i++) {
        if (ular[i].x === ular[0].x && ular[i].y === ular[0].y) return true;
    }

    const damageTembokKiri = ular[0].x < 0;
    const damageTembokKanan = ular[0].x > ularCanvas.width - 10;
    const damageTembokAtas = ular[0].y < 0;
    const damageTembokBawah = ular[0].y > ularCanvas.height - 10;
    return damageTembokKiri || damageTembokKanan || damageTembokAtas || damageTembokBawah;
}

function randomFood(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function spawnFood() {
    foodThdSmx = randomFood(0, ularCanvas.width - 10);
    foodThdSmy = randomFood(0, ularCanvas.height - 10);
    ular.forEach(function ularMakan(part) {
        const ularMakan = part.x == foodThdSmx && part.y == foodThdSmy;
        if (ularMakan) spawnFood();
    });
}

function changeDirection(event) {
    const panahKiri = 37;
    const panahKanan = 39;
    const panahAtas = 38;
    const panahBawah = 40;
    // atur pergerakan ular / lintasnya
    if (changingDirection) return;
    changingDirection = true;
    const keyboardDitekan = event.keyCode;
    const up = directionY === -10;
    const down = directionY === 10;
    const right = directionX === 10;
    const left = directionX === -10;

    if (keyboardDitekan === panahKiri && !right) {
        directionX = -10;
        directionY = 0;
    }

    if (keyboardDitekan === panahAtas && !down) {
        directionX = 0;
        directionY = -10;
    }

    if (keyboardDitekan === panahKanan && !left) {
        directionX = 10;
        directionY = 0;
    }

    if (keyboardDitekan === panahBawah && !up) {
        directionX = 0;
        directionY = 10;
    }
}

function moveSnake() {
    const kepalaUlar = {
        x: ular[0].x + directionX,
        y: ular[0].y + directionY
    };

    ular.unshift(kepalaUlar);

    const mauMakan = ular[0].x === foodThdSmx && ular[0].y === foodThdSmy;
    if (mauMakan) {
        // tambahin scorenya jika ular makan
        score += 1;

        // tampilkan ke antamuka web
        const countScore = document.getElementById('score');
        countScore.textContent = `Score : ${score}`;

        // random tata letak foodnya
        spawnFood();
    } else {
        ular.pop();
    }
}