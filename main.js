/*===== MENU SHOW Y HIDDEN =====*/
const navMenu = document.getElementById('nav-menu'),
    toggleMenu = document.getElementById('nav-toggle'),
    closeMenu = document.getElementById('nav-close');

// SHOW
toggleMenu.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

// HIDDEN
closeMenu.addEventListener('click', () => {
    navMenu.classList.remove('show');
});

/*===== SCROLL SECTIONS ACTIVE LINK =====*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active');
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active');
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*===== CHANGE BACKGROUND HEADER =====*/
function scrollHeader() {
    const header = document.getElementById('header');
    if (this.scrollY >= 200) header.classList.add('scroll-header'); else header.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/*===== SHOW SCROLL TOP =====*/
function scrollTop() {
    const scrollTop = document.getElementById('scroll-top');
    if (this.scrollY >= 560) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollTop);

/*===== GSAP ANIMATION =====*/
gsap.from('.nav__logo, .nav__toggle', { opacity: 0, duration: 1, delay: 2, y: 10 });
gsap.from('.nav__item', { opacity: 0, duration: 1, delay: 2.1, y: 30, stagger: 0.2 });

gsap.from('.home__title', { opacity: 0, duration: 1, delay: 1.6, y: 30 });
gsap.from('.home__description', { opacity: 0, duration: 1, delay: 1.8, y: 30 });
gsap.from('.home__button', { opacity: 0, duration: 1, delay: 2.1, y: 30 });
gsap.from('.home__img', { opacity: 0, duration: 1, delay: 1.3, y: 30 });

/*===== REMOVE MENU MOBILE =====*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction(e) {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show');

    const targetId = e.currentTarget.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    const yOffset = -50;
    const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: 'smooth' });
}
navLink.forEach(n => n.addEventListener('click', linkAction));

let nextBtn = document.querySelector('.next')
let prevBtn = document.querySelector('.prev')

let slider = document.querySelector('.slider')
let sliderList = slider.querySelector('.slider .list')
let thumbnail = document.querySelector('.slider .thumbnail')
let thumbnailItems = thumbnail.querySelectorAll('.item')

thumbnail.appendChild(thumbnailItems[0])

// Function for next button 
nextBtn.onclick = function() {
    moveSlider('next')
}


// Function for prev button 
prevBtn.onclick = function() {
    moveSlider('prev')
}


function moveSlider(direction) {
    let sliderItems = sliderList.querySelectorAll('.item')
    let thumbnailItems = document.querySelectorAll('.thumbnail .item')
    
    if(direction === 'next'){
        sliderList.appendChild(sliderItems[0])
        thumbnail.appendChild(thumbnailItems[0])
        slider.classList.add('next')
    } else {
        sliderList.prepend(sliderItems[sliderItems.length - 1])
        thumbnail.prepend(thumbnailItems[thumbnailItems.length - 1])
        slider.classList.add('prev')
    }


    slider.addEventListener('animationend', function() {
        if(direction === 'next'){
            slider.classList.remove('next')
        } else {
            slider.classList.remove('prev')
        }
    }, {once: true}) // Remove the event listener after it's triggered once
}

function initMap() {
    // Coordinates for Colegio San Rafael IED, Bogotá, Colombia
    const colegioSanRafael = { lat: 4.666897, lng: -74.059653 };

    // Create the map
    const map = new google.maps.Map(document.getElementById('map'), {
        center: colegioSanRafael,
        zoom: 15
    });

    // Create a marker for the location
    const marker = new google.maps.Marker({
        position: colegioSanRafael,
        map: map,
        title: "Colegio San Rafael IED"
    });

    // Open Google Maps in a new tab when the marker is clicked
    marker.addListener('click', function() {
        window.open(`https://www.google.com/maps/search/?api=1&query=4.666897,-74.059653`, '_blank');
    });
}

// Initialize the map
google.maps.event.addDomListener(window, 'load', initMap);

//chatbot
document.getElementById('chatbot-icon').addEventListener('click', function() {
            var chatbotContainer = document.getElementById('chatbot-container');
            if (chatbotContainer.classList.contains('show')) {
                chatbotContainer.classList.remove('show');
                setTimeout(function() {
                    chatbotContainer.style.display = 'none';
                }, 300); // Coincide con el tiempo de transición
            } else {
                chatbotContainer.style.display = 'block';
                setTimeout(function() {
                    chatbotContainer.classList.add('show');
                }, 10); // Pequeño retraso para permitir que display: block; se aplique antes de la transición
            }
        });