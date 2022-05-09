// tangkap element canvasnya
const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');
let x = canvas.width / 2;
let y = canvas.height - 30;
let directionX = 2;
let directionY = -2;
let ballRadius = 10;
let boxHeight = 10; //tinggi paddle pada bola / pijakan
let boxWidth = 75;  //lebar ukuran dari pijakan bolanya
let boxX = (canvas.width - boxWidth) / 2;
let arrowKanan = false;
let arrowKiri = false;
let brickRowCount = 5;
let brickColumnCount = 8;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
let bricks = [];
let score = 0;
let nyawa = 3;

for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];

    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = {
            x: 0,
            y: 0,
            status: 1
        };
    }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key == 'Right' || e.key == 'ArrowRight') {
        arrowKanan = true;
    } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
        arrowKiri = true;
    }
}

function keyUpHandler(e) {
    if (e.key == 'Right' || e.key == 'ArrowRight') {
        arrowKanan = false;
    } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
        arrowKiri = false;
    }
}

function tabrakDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];

            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    directionY = -directionY;
                    b.status = 0;
                    score++;
                    if (score == brickRowCount * brickColumnCount) {
                        alert('Selamat, Kamu Menang!');
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function cetakScore() {
    context.font = '16px Arial';
    context.fillStyle = '#0095DD';
    context.fillText('Score:' + score, 8, 20);
}

function cetakBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;

                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;

                context.beginPath();
                context.rect(brickX, brickY, brickWidth, brickHeight);
                context.fillStyle = '#0095DD';
                context.fill();
                context.closePath();
            }
        }
    }
}

function cetakNyawa() {
    context.font = '16px Arial';
    context.fillStyle = '#0095DD';
    context.fillText('Nyawa: ' + nyawa, canvas.width - 65, 20);
}

function cetakBola() {
    context.beginPath();
    context.arc(x, y, 10, 0, Math.PI * 2);
    context.fillStyle = '#0095DD';
    context.fill();
    context.closePath();
}

function cetakPijakan() {
    context.beginPath();
    context.rect(boxX, canvas.height - boxHeight, boxWidth, boxHeight);
    context.fillStyle = '#0095DD';
    context.fill();
    context.closePath();
}

function cetakanUtama() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    cetakBricks();
    cetakBola();
    cetakPijakan();
    cetakScore();
    cetakNyawa();
    tabrakDetection();

    x += directionX;
    y += directionY;

    if (x + directionX > canvas.width - ballRadius || x + directionX < ballRadius) {
        directionX = -directionX;
    }

    if (y + directionY < ballRadius) {
        directionY = -directionY;
    } else if (y + directionY > canvas.height - ballRadius) {
        if (x > boxX && x < boxX + boxWidth) {
            directionY = -directionY
        } else {
            nyawa--;
            if (!nyawa) {
                alert('Game Over!');
                document.location.reload();
            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                directionX = 2;
                directionY = -2;
                boxX = (canvas.width - boxWidth) / 2;
            }
        }
    }

    if (arrowKanan) {
        boxX += 7;
        if (boxX + boxWidth > canvas.width) {
            boxX = canvas.width - boxWidth;
        }
    } else if (arrowKiri) {
        boxX -= 7;
        if (boxX < 0) {
            boxX = 0;
        }
    }
    requestAnimationFrame(cetakanUtama);
}

cetakanUtama();