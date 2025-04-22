/*function entrerDansSerrure() {
    const bourdon = document.querySelector('.bourdon');

    // Lance l'animation
    bourdon.classList.add('active');

    // Redirection après délai (2s)
    setTimeout(() => {
    window.location.href = 'https://www.instagram.com/au_jardin_daimee/';
}, 1000);
}*/

const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');
const dropdownLink = document.querySelector('.dropdown > a');

burger.addEventListener('click', (e) => {
    e.stopPropagation(); // Empêche la propagation du clic
    navLinks.classList.toggle('show');
});

dropdownLink.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation(); // Empêche la propagation vers d'autres éléments
    dropdownLink.parentElement.classList.toggle('show');
});

const dropdownItems = document.querySelectorAll('.dropdown-menu li a');
dropdownItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
        document.querySelector('.dropdown').classList.remove('show');
    }

    if (window.innerWidth <= 768 && !e.target.closest('.nav-links') && !e.target.closest('#burger')) {
        navLinks.classList.remove('show');
    }
});

function initCarousel() {
    // Sélection des éléments
    const slides = document.querySelectorAll('.carousel-slide');
    const dotsContainer = document.querySelector('.carousel-dots');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');

    let currentIndex = 0;
    let interval = null;
    const slideDelay = 4000; // Délai entre les slides (4 secondes)

    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetAutoSlide();
        });
        dotsContainer.appendChild(dot);
    });

    function goToSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        document.querySelectorAll('.carousel-dot').forEach(dot => dot.classList.remove('active'));

        slides[index].classList.add('active');
        document.querySelectorAll('.carousel-dot')[index].classList.add('active');

        currentIndex = index;
    }

    function prevSlide() {
        const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
        goToSlide(newIndex);
    }

    function nextSlide() {
        const newIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
        goToSlide(newIndex);
    }

    function startAutoSlide() {
        if (interval === null) {
            interval = setInterval(nextSlide, slideDelay);
        }
    }

    function stopAutoSlide() {
        if (interval !== null) {
            clearInterval(interval);
            interval = null;
        }
    }

    function resetAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }

    prevButton.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    nextButton.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', stopAutoSlide);
    carouselContainer.addEventListener('mouseleave', startAutoSlide);

    startAutoSlide();
}

document.addEventListener('DOMContentLoaded', initCarousel);