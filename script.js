// Loading Screen
const loadingScreen = document.getElementById('loadingScreen');
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const musicIcon = document.querySelector('.music-icon');
const muteIcon = document.querySelector('.mute-icon');

// Hide loading screen and start music after animation
setTimeout(() => {
    loadingScreen.style.display = 'none';
    
    // Auto-play music (with user interaction fallback)
    bgMusic.volume = 0.3; // Set volume to 30%
    const playPromise = bgMusic.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            musicToggle.classList.add('playing');
        }).catch(error => {
            // Auto-play was prevented, user needs to click to start
            console.log('Auto-play prevented. Click the music button to start.');
        });
    }
}, 4000);

// Music Toggle Control
let isPlaying = false;

musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicIcon.style.display = 'none';
        muteIcon.style.display = 'block';
        musicToggle.classList.remove('playing');
    } else {
        bgMusic.play();
        musicIcon.style.display = 'block';
        muteIcon.style.display = 'none';
        musicToggle.classList.add('playing');
    }
    isPlaying = !isPlaying;
});

// Update button state when music plays
bgMusic.addEventListener('play', () => {
    isPlaying = true;
    musicToggle.classList.add('playing');
});

bgMusic.addEventListener('pause', () => {
    isPlaying = false;
    musicToggle.classList.remove('playing');
});

// Create floating particles
const particlesContainer = document.getElementById('particles');
const particleCount = 50;

for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    particlesContainer.appendChild(particle);
}

// Smooth scroll reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.info-card').forEach(card => {
    observer.observe(card);
});

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        const speed = (index % 3 + 1) * 0.5;
        particle.style.transform = `translateY(${scrolled * speed}px)`;
    });
});