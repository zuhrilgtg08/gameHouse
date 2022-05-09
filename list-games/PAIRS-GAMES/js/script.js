const myCards = document.getElementById('container');
const text = document.getElementById('text');
const menitSaya = document.getElementById('menit');
const detikSaya = document.getElementById('detik');
let menit = 00;
let detik = 00;
let myArray = [];
let counter = 0;
let interval;
let images = [
    'illus1',
    'illus2',
    'illus3',
    'illus4',
    'illus5'
];
const clone = images.slice(0) //cloning pada array images
const cards = images.concat(clone); //masukkan ke array nya lagi

// function acak
function acak(o) {
    for (let j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

acak(cards);

for (let i = 0; i < cards.length; i++) {
    let card = document.createElement('div');
    card.dataset.items = cards[i];
    card.dataset.view = "card";
    myCards.appendChild(card);

    card.addEventListener('click', function () {
        if (this.className != 'flipped' && this.className != 'correct') {
            this.className = 'flipped';
            let hasil = this.dataset.items;
            myArray.push(hasil);
            clearInterval(interval);
            interval = setInterval(startTimer, 10);
        }

        if (myArray.length > 1) {
            if (myArray[0] === myArray[1]) {
                checked('correct');
                counter++;
                winner();
                myArray = [];
            } else {
                checked('reverse');
                myArray = [];
            }
        }
    });
}

const checked = function (className) {
    let x = document.getElementsByClassName('flipped');
    setTimeout(function () {
        for (let i = (x.length - 1); i >= 0; i--) {
            x[i].className = className;
        }
    }, 500);
}

const winner = function () {
    if (counter === 5) {
        clearInterval(interval);
        text.innerHTML = `Your time was ${menit} : ${detik}`;
    }
}

function startTimer() {
    detik++;
    if (detik < 9) {
        detikSaya.innerHTML = `0 ${detik}`;
    }
    if (detik > 9) {
        detikSaya.innerHTML = detik;
    }
    if (detik > 99) {
        menit++;
        menitSaya.innerHTML = `0 ${menit}`;
        detik = 0;
        detikSaya.innerHTML = '0' + 0;
    }
    if (menit > 9) {
        menitSaya.innerHTML = menit;
    }
}