// --- Loading Screen & Music Logic ---
const loadingScreen = document.getElementById('loadingScreen');
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const musicIcon = document.querySelector('.music-icon');
const muteIcon = document.querySelector('.mute-icon');

let isMusicPlaying = false;
let hasEntered = false;

// ฟังก์ชันเริ่มการทำงานเมื่อคลิกที่ Loading Screen
loadingScreen.addEventListener('click', () => {
    if (hasEntered) return; // ป้องกันการกดซ้ำ
    hasEntered = true;

    // 1. เริ่มเล่นเพลง
    bgMusic.volume = 0.3;
    bgMusic.play().then(() => {
        musicToggle.classList.add('playing');
        musicIcon.style.display = 'block';
        muteIcon.style.display = 'none';
        isMusicPlaying = true;
    }).catch(error => {
        console.log("Auto-play prevented:", error);
        // กรณีเกิด error ก็ยังให้เข้าเว็บได้ แต่ปุ่มเพลงจะแสดงสถานะปิด
    });

    // 2. ซ่อนหน้า Loading (ใช้ Class hidden ใน CSS)
    loadingScreen.classList.add('hidden');
    
    // ลบ Element ทิ้งไปเลยหลังจาก Animation จบ (1 วินาที)
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 1000);
});

// --- Music Toggle Control ---
musicToggle.addEventListener('click', () => {
    if (isMusicPlaying) {
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
    isMusicPlaying = !isMusicPlaying;
});

// --- Emerald Rain Particles ---
const particlesContainer = document.getElementById('particles');
const particleCount = 80; // จำนวนเม็ดฝน

for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // สุ่มตำแหน่งแนวนอน
    particle.style.left = Math.random() * 100 + '%';
    
    // สุ่มขนาดให้มีมิติ (เล็ก-ใหญ่)
    const size = Math.random() * 3 + 2 + 'px'; // 2px - 5px
    particle.style.width = size;
    particle.style.height = size;
    
    // สุ่ม Delay และ Speed
    particle.style.animationDelay = Math.random() * 5 + 's';
    particle.style.animationDuration = (Math.random() * 2 + 3) + 's'; // 3s - 5s
    
    // สุ่มความทึบแสง
    particle.style.opacity = Math.random() * 0.5 + 0.2; 
    
    particlesContainer.appendChild(particle);
}

// --- Scroll Reveal Animation ---
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

// --- Parallax Effect ---
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const particles = document.querySelectorAll('.particle');
    // ขยับฝนเล็กน้อยเวลาเลื่อนจอ
    particles.forEach((particle, index) => {
        const speed = (index % 3 + 1) * 0.2;
        particle.style.transform = `translateY(${scrolled * speed}px) rotate(45deg)`;
    });
});

document.querySelectorAll('.read-more-btn').forEach(button => {
    button.addEventListener('click', () => {
        // หาตัวกล่องข้อความที่อยู่ก่อนหน้าปุ่มนี้
        const content = button.previousElementSibling;
        
        // สลับสถานะ class 'expanded'
        content.classList.toggle('expanded');
        
        // เปลี่ยนข้อความบนปุ่ม
        if (content.classList.contains('expanded')) {
            button.textContent = 'ย่อลง';
        } else {
            button.textContent = 'อ่านเพิ่มเติม';
            
            // (Optional) ถ้ากดย่อแล้วอยากให้เลื่อนกลับไปตำแหน่งเดิม uncomment บรรทัดล่างนี้ครับ
            // content.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
});
