// panggil semua element dan node yang dibutuhkan
const containerSelect = document.querySelector('.container-select');
const buttonX = containerSelect.querySelector('.opsi .playerX');
const buttonO = containerSelect.querySelector('.opsi .playerO');
const playBoard = document.querySelector('.play-board');
const players = document.querySelector('.players');
const allSection = document.querySelectorAll('section span');
const resultBox = document.querySelector('.result-box');
const winnerText = resultBox.querySelector('.winner-text');
const resetButton = resultBox.querySelector('button');
const scorePlayer = document.getElementById('score-player');
const scoreKomputer = document.getElementById('score-komputer');

// ketika halaman di load
window.onload = function () {
    for (let i = 0; i < allSection.length; i++) {
        // tambah attibute onclik jika ada span didalamnya
        allSection[i].setAttribute('onclick', 'clickedKotak(this)');
    }
}

// ketika button X di click tambakan classList hidden dan playBoad show
buttonX.addEventListener('click', function () {
    containerSelect.classList.add('hidden');
    playBoard.classList.add('show');
});

buttonO.addEventListener('click', function () {
    containerSelect.classList.add('hidden');
    playBoard.classList.add('show');
    players.setAttribute('class', 'players active player');
});

let iconXplayer = 'fas fa-times'; //tambah class  font-awesome
let iconOplayer = 'far fa-circle'; //Timpa dengan class font-awesome
let playerMasuk = 'X'; //Global variable dimana valuenya akan ditimpa di setiap function
let botComputer = true; //kondisi awal bot
let scorePlayerCount = 0;
let scoreKomputerCount = 0;

// function ketika user click
function clickedKotak(element) {
    if (players.classList.contains('player')) {
        playerMasuk = 'O'; //ubah jadi O Player 
        element.innerHTML = `<i class="${iconOplayer}"></i>`;
        players.classList.remove('active');
        element.setAttribute('id', playerMasuk);
    } else {
        element.innerHTML = `<i class="${iconXplayer}"></i>`; //isi dengan X player
        element.setAttribute('id', playerMasuk);
        players.classList.add('active');
    }

    pilihPemenang(); //panggil atau generate pemenangnya

    element.style.pointerEvents = 'none';
    playBoard.style.pointerEvents = 'none';

    // buat random waktu delay ketika bot turn x atau o
    let randomTimeDelay = ((Math.random() * 1000) + 200).toFixed();
    setTimeout(() => {
        komputer(botComputer);
    }, randomTimeDelay);
}

// function komputer
function komputer() {
    let array = []; //bikin array kosong
    if (botComputer) {
        // jika bernilai true
        playerMasuk = 'O';

        for (let i = 0; i < allSection.length; i++) {
            if (allSection[i].childElementCount == 0) {
                array.push(i);
            }
        }

        // bikin random box buat komputer turn
        let komputerRandom = array[Math.floor(Math.random() * array.length)];

        if (array.length > 0) {
            if (players.classList.contains('player')) {
                playerMasuk = 'X'; //ubah jadi X player bot
                allSection[komputerRandom].innerHTML = `<i class="${iconXplayer}"></i>`;
                // semua section index ke komputerRandom set attributnya setiap ada player masuk
                allSection[komputerRandom].setAttribute('id', playerMasuk);
                players.classList.add('active');
            } else {
                allSection[komputerRandom].innerHTML = `<i class="${iconOplayer}"></i>`;
                players.classList.remove('active');
                allSection[komputerRandom].setAttribute('id', playerMasuk);
            }
            pilihPemenang();
        }

        allSection[komputerRandom].style.pointerEvents = 'none';
        playBoard.style.pointerEvents = 'auto';
        playerMasuk = 'X';
    }
}

function getIdValue(nameclass) {
    return document.querySelector('.box' + nameclass).id;
}

function checkIdMasuk(val1, val2, val3, masuk) {
    if (getIdValue(val1) == masuk && getIdValue(val2) == masuk && getIdValue(val3) == masuk) {
        return true;
    }
}

function pilihPemenang() {
    if (checkIdMasuk(1, 2, 3, playerMasuk) || checkIdMasuk(4, 5, 6, playerMasuk) || checkIdMasuk(7, 8, 9, playerMasuk) || checkIdMasuk(1, 4, 7, playerMasuk) || checkIdMasuk(2, 5, 8, playerMasuk) || checkIdMasuk(3, 6, 9, playerMasuk) || checkIdMasuk(1, 5, 9, playerMasuk) || checkIdMasuk(3, 5, 7, playerMasuk)) {
        botComputer = false;

        komputer(botComputer);
        setTimeout(() => {
            resultBox.classList.add('show');
            playBoard.classList.remove('show');
        }, 700);

        winnerText.innerHTML = `Player <p>${playerMasuk}</p> The Winner!`;

    } else {
        if (getIdValue(1) != "" && getIdValue(2) != "" && getIdValue(3) != "" && getIdValue(4) != "" && getIdValue(5) != "" && getIdValue(6) != "" && getIdValue(7) != "" && getIdValue(8) != "" && getIdValue(9) != "") {
            botComputer = false;
            komputer(botComputer);

            setTimeout(() => {
                resultBox.classList.add('show');
                playBoard.classList.remove('show');
            }, 700);

            winnerText.textContent = "Match has been Draw!";
        }
    }
}

resetButton.addEventListener('click', () => window.location.reload());