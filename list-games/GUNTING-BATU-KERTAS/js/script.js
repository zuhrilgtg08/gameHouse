$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

AOS.init();

// get all bot-img
const imgBot = document.querySelector('.img-bot');
const pilihanLi = Array.from(document.querySelectorAll('.pilihan > img'));
const info = document.querySelector('.info');

// botScore & scorePlayer
const scoreBot = document.getElementById('score-bot');
const scorePlayer = document.getElementById('score-player');
let botScoreCount = 0;
let playerScoreCount = 0;

// get hasil-score-objcet & hasil-score
const hasilScore = document.querySelector('.boxfocus');
const hasilScoreObject = document.getElementById('hasil-score-object');

// bot function
function pilihanBot() {
    const bot = Math.random();
    if (bot < 0.33) return 'batu';
    else if (bot >= 0.33 && bot < 0.667) return 'kertas';
    return 'gunting';
}

function getHasil(bot, player) {
    if (player === bot) return 'DRAW!';
    else if (player === 'batu') {
        if (bot === 'kertas') {
            botScoreCount += 1;
            return 'LOSE!';
        } else {
            playerScoreCount += 1;
            return 'WIN!';
        }
    } else if (player === 'kertas') {
        if (bot === 'batu') {
            playerScoreCount += 1;
            return 'WIN!';
        } else {
            botScoreCount += 1;
            return 'LOSE!';
        }
    } else if (player === 'gunting') {
        if (bot === 'kertas') {
            playerScoreCount += 1;
            return 'WIN!';
        } else {
            botScoreCount += 1;
            return 'LOSE!';
        }
    }
}

let result;

function frontInfo(hasil) {
    if (hasil === 'DRAW!') {
        info.style.backgroundColor = '#EDEDED';
        info.classList.add('text-black');
    } else if (hasil === 'WIN!') {
        info.classList.remove('text-black');
        info.style.backgroundColor = '#2BBB0E';
    } else if (hasil === 'LOSE!') {
        info.classList.remove('text-black');
        info.style.backgroundColor = 'crimson';
    }
}

let i = 0;
// acak-gambar
function acakGmbar() {
    const mulai = new Date().getTime();

    setInterval(() => {
        if (new Date().getTime() - mulai > 1100) {
            clearInterval;
            return;
        }

        imgBot.setAttribute('src', pilihanLi[i++].getAttribute('src'));
        if (i === pilihanLi.length) {
            i = 0;
        }
    }, 120);
}

function noteBot() {
    const kalimatBot = Math.random();
    if (kalimatBot < 0.2) return 'Mantap, coba lain waktu ya!';
    else if (kalimatBot >= 0.2 && kalimatBot < 0.4) return 'Ayok kamu pasti bisa!';
    else if (kalimatBot >= 0.4 && kalimatBot < 0.6) return 'Yok, kamu pasti bisa!';
    else if (kalimatBot >= 0.6 && kalimatBot < 0.8) return 'Bot nya OP juga yah!';
    return 'yah udahan dah...';
}

function notePlayer() {
    const kalimatPlayer = Math.random();
    if (kalimatPlayer < 0.2) return 'GG Gaming!';
    else if (kalimatPlayer >= 0.2 && kalimatPlayer < 0.4) return 'Lanjut Kalahkan Bro!';
    else if (kalimatPlayer >= 0.4 && kalimatPlayer < 0.6) return 'Botnya Kena Mental wkwkwk';
    else if (kalimatPlayer >= 0.6 && kalimatPlayer < 0.8) return 'INTERESTING Lo Bro!';
    return 'Hmm... Tidak Diragukan Lagi You The Best!';
}

// main program
pilihanLi.forEach(function (img) {
    img.addEventListener('click', function () {
        const chooseBot = pilihanBot();
        const pilihanPlayer = this.className;
        const hasil = getHasil(chooseBot, pilihanPlayer);

        setTimeout(() => {
            if (chooseBot === 'batu') {
                imgBot.setAttribute('src', 'images/batu.png');
            } else if (chooseBot === 'kertas') {
                imgBot.setAttribute('src', 'images/kertas.png');
            } else if (chooseBot === 'gunting') {
                imgBot.setAttribute('src', 'images/gunting.png');
            }

            info.textContent = hasil;
            frontInfo(hasil);

            scoreBot.textContent = botScoreCount;
            scorePlayer.textContent = playerScoreCount;

            if (botScoreCount >= 4) {
                hasilScore.classList.remove('hidden');
                hasilScoreObject.textContent = 'Z-Bot';
                hasilScoreObject.style.color = '#5C33F6';
                document.getElementById('hasil-score-note').textContent = noteBot();
                scoreBot.textContent = botScoreCount = 4;
            } else if (playerScoreCount >= 4) {
                hasilScore.classList.remove('hidden');
                hasilScoreObject.textContent = 'Player';
                hasilScoreObject.style.color = '#DA0037';
                document.getElementById('hasil-score-note').textContent = notePlayer();
                scorePlayer.textContent = playerScoreCount = 4;
            }

        }, 1100);

        acakGmbar();
    });
});

hasilScore.querySelector('button').addEventListener('click', function () {
    hasilScore.classList.add('hidden');
    scoreBot.textContent = botScoreCount = 0;
    scorePlayer.textContent = playerScoreCount = 0;

    info.classList.remove('text-black');
    info.style.backgroundColor = '#F9F9F9';
    info.textContent = '';
    info.classList.remove('text-black');
    info.style.backgroundColor = '#F9F9F9';
    info.textContent = '';
});