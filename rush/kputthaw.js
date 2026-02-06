// Smooth scrolling for navbar links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Highlight active nav link on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

document.getElementById('shuffleButton').addEventListener('click', function() {
    const container = document.querySelector('.container');
    const sections = Array.from(container.querySelectorAll('section'));
    
    // Shuffle the sections array
    for (let i = sections.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [sections[i], sections[j]] = [sections[j], sections[i]];
    }
    
    // Clear container and re-append shuffled sections
    container.innerHTML = '';
    sections.forEach(section => container.appendChild(section));
});

const profileImg = document.querySelector('.about img');
let imgX = 0;
let imgY = 0;

document.addEventListener('mousemove', function(e) {
    const rect = profileImg.getBoundingClientRect();
    const imgCenterX = rect.left + rect.width / 2;
    const imgCenterY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const deltaX = imgCenterX - mouseX;
    const deltaY = imgCenterY - mouseY;
    
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    if (distance < 200) {
        imgX = (deltaX / distance) * 100;
        imgY = (deltaY / distance) * 100;
        
        profileImg.style.transform = `translate(${imgX}px, ${imgY}px)`;
    } else {
        profileImg.style.transform = 'translate(0, 0)';
    }
});