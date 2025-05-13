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

if (document.querySelector('.carousel-container') !== null) {
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
}


function entrerDansSerrure() {
    const bourdon = document.querySelector('.bourdon');

    bourdon.classList.add('active');

    setTimeout(() => {
        window.location.href = 'https://www.instagram.com/au_jardin_daimee/';
    }, 1000);
}

// Fonction pour générer l'adresse mail etr créer le mailto

document.addEventListener('DOMContentLoaded', function() {
    const emailLink = document.getElementById('email-link');

    const username = 'valentinvanhelle30';
    const domain = 'gmail.com';
    const emailAddress = username + '@' + domain;


    emailLink.setAttribute('href', 'mailto:' + emailAddress);

    emailLink.addEventListener('click', function(e) {
        window.location.href = 'mailto:' + emailAddress;
        e.preventDefault();
    });
});



// Validation du formulaire avant envoi
function validateForm() {
    const nom = document.getElementById('nom').value.trim();
    const prenom = document.getElementById('prenom').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    const namePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ\s\-']{2,50}$/;
    if (!namePattern.test(nom) || !namePattern.test(prenom)) {
        alert("Le nom et prénom ne doivent contenir que des lettres, espaces, tirets ou apostrophes");
        return false;
    }

    const emailPattern = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        alert("Veuillez entrer une adresse email valide");
        return false;
    }

    if (message.length < 10 || message.length > 1000) {
        alert("Le message doit contenir entre 10 et 1000 caractères");
        return false;
    }

    if (message.includes('<script') || message.includes('javascript:')) {
        alert("Contenu non autorisé détecté");
        return false;
    }

    document.getElementById('submit-btn').disabled = true;
    setTimeout(function() {
        document.getElementById('submit-btn').disabled = false;
    }, 5000);

    return true;
}

document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], textarea');

    inputs.forEach(input => {
        input.addEventListener('input', function() {
            this.value = this.value
                .replace(/<script/gi, '')
                .replace(/javascript:/gi, '')
                .replace(/on\w+=/gi, '');
        });
    });
});