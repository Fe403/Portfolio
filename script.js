// ===== DARK/LIGHT MODE =====
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const icon = themeToggle.querySelector('i');

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        icon.className = 'ph ph-sun';
    } else {
        icon.className = 'ph ph-moon';
    }
}

// ===== MENU MOBILE =====
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const menuIcon = menuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
        menuIcon.className = 'ph ph-x';
    } else {
        menuIcon.className = 'ph ph-list';
    }
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.querySelector('i').className = 'ph ph-list';
    });
});

// ===== FORMULÁRIO DE CONTATO (Formspree via fetch) =====
const form = document.getElementById('contact-form');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Impede o redirecionamento da página

    // Muda o botão para "Enviando..."
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="ph ph-circle-notch"></i> Enviando...';

    const data = new FormData(form);

    try {
        const response = await fetch('https://formspree.io/f/xkolvwer', {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // Sucesso!
            submitBtn.innerHTML = '<i class="ph ph-check-circle"></i> Mensagem Enviada!';
            submitBtn.style.backgroundColor = '#22c55e';
            form.reset();

            // Volta ao normal depois de 3 segundos
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="ph ph-paper-plane-tilt"></i> Enviar Mensagem';
                submitBtn.style.backgroundColor = '';
            }, 3000);
        } else {
            throw new Error('Erro no envio');
        }
    } catch (error) {
        // Erro!
        submitBtn.innerHTML = '<i class="ph ph-warning"></i> Erro ao enviar';
        submitBtn.style.backgroundColor = '#ef4444';

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="ph ph-paper-plane-tilt"></i> Enviar Mensagem';
            submitBtn.style.backgroundColor = '';
        }, 3000);
    }
});

// ===== NAVBAR: sombra ao rolar + link ativo da seção =====
const header = document.querySelector('header');
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-link');

function handleNavbarScroll() {
    if (window.scrollY > 10) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navAnchors.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', handleNavbarScroll);
handleNavbarScroll();

// ===== ANIMAÇÃO DE SCROLL (REVEAL) =====
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - 150) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);
reveal();
