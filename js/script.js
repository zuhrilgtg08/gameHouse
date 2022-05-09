// bikin menu hamburger manipulation
let menu = document.querySelector('.menu-icons');
let navbar = document.querySelector('.menu');

// Notifikasi
let bell = document.querySelector('.notifikasi');
let belIcon = document.querySelector('#bell-icon');

menu.addEventListener('click', function () {
    navbar.classList.toggle('active');
    menu.classList.toggle('move');
    bell.classList.remove('active');
});

belIcon.onclick = () => {
    bell.classList.toggle('active');
}

// swiper js pada slide
const swiperTrending = new Swiper('.trending-content', {
    slidesPerView: 1,
    spaceBetween: 10,

    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },

    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 10,
        },

        768: {
            slidesPerView: 3,
            spaceBetween: 15,
        },

        1068: {
            slidesPerView: 4,
            spaceBetween: 20,
        },
    },
});

const swiperComing = new Swiper('.coming-content', {
    slidesPerView: 1,
    spaceBetween: 10,

    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },

    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 10,
        },

        768: {
            slidesPerView: 3,
            spaceBetween: 15,
        },

        1068: {
            slidesPerView: 4,
            spaceBetween: 20,
        },
    },
});

// kustom scroll-bar
window.onscroll = function () {
    const windScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (windScroll / height) * 100;

    // tangkap scroll-bar Id
    const scrollBar = document.getElementById('scroll-bar');
    scrollBar.style.width = scrolled + '%';
}