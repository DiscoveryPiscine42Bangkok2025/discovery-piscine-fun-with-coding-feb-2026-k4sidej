document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Typing Animation for the Hero Section
    const textElement = document.getElementById('typing-text');
    const professions = ['AI Engineering', 'Web Development', 'UI/UX Design'];
    let count = 0;
    let index = 0;
    let currentText = '';
    let letter = '';

    (function type() {
        if (count === professions.length) {
            count = 0;
        }
        currentText = professions[count];
        letter = currentText.slice(0, ++index);

        textElement.textContent = letter;
        if (letter.length === currentText.length) {
            count++;
            index = 0;
            setTimeout(type, 2000); // Wait 2 seconds at the end of word
        } else {
            setTimeout(type, 100); // Typing speed
        }
    }());

    // 2. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight / 5 * 4;

        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;

            if (elTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    };

    // Run on scroll
    window.addEventListener('scroll', revealOnScroll);
    
    // Run once on load to show elements already in view
    revealOnScroll();

    // 3. Navbar background change on scroll
    const nav = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('bg-dark', 'shadow');
        } else {
            nav.classList.remove('shadow');
        }
    });
});