const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');
const toast = document.getElementById('toast');
const contactForm = document.getElementById('contact-form');
const ctaButtons = document.querySelectorAll('.marcar-aula, #cta-hero');
const verPerfilButtons = document.querySelectorAll('.ver-perfil');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
    });
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (mobileToggle) {
            mobileToggle.textContent = '☰';
        }
    });
});

function openWhatsApp(messageType = 'default') {

    const phoneNumber = '5511973329674';
    
    const messages = {
        'default': 'Olá Gostaria de agendar uma aula experimental gratuita no Papo com Inglês',
        'professor-jordan': 'Olá! Gostaria de marcar uma aula experimental com o professor Jordan do Papo com Inglês',
        'professor-livia': 'Olá! Gostaria de marcar uma aula experimental com a professora Livia do Papo com Inglês',
        'professor-gustavo': 'Olá! Gostaria de marcar uma aula experimental com o professor Gustavo do Papo com Inglês',
        'professor-celine': 'Olá! Gostaria de marcar uma aula experimental com a professora Celine do Papo com Inglês',
        'plano-grupo': 'Olá! Tenho interesse no plano Grupo de R$ 34,90 do Papo com Inglês',
        'plano-dupla': 'Olá! Tenho interesse no plano Dupla de R$ 39,90 do Papo com Inglês',
        'plano-individual': 'Olá! Tenho interesse no Plano Indivisual de R$ 39,90 do Papo com Inglês',
        'duvidas': 'Olá! Gostaria de tirar algumas dúvidas sobre os cursos do Papo com Inglês',
        'patrocinio': 'Olá! Tenho interesse em saber mais sobre oportunidades de patrocínio no Papo com Inglês',
        'contato': 'Olá! Gostaria de mais informações sobre o Papo com Inglês'
    };
    
    const message = messages[messageType] || messages['default'];
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, '_blank', 'noopener,noreferrer');
}

ctaButtons.forEach(button => {
    button.addEventListener('click', function() {
        const messageType = this.getAttribute('data-whatsapp') || 'default';
        openWhatsApp(messageType);
    });
});

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const phone = document.getElementById('phone') ? document.getElementById('phone').value : '';
        const subject = document.getElementById('subject') ? document.getElementById('subject').value : '';
        
        if (name && email && message) {
            showToast('Mensagem enviada com sucesso! Em breve entraremos em contato.');
            contactForm.reset();
            
            const emailBody = `
Nome: ${name}
Email: ${email}
${phone ? `Telefone: ${phone}` : ''}
${subject ? `Assunto: ${subject}` : ''}
Mensagem: ${message}
            `.trim();
            
            const mailtoLink = `mailto:contato@papocomingles.com?subject=Contato do Site Papo com Inglês&body=${encodeURIComponent(emailBody)}`;
        } else {
            showToast('Por favor, preencha todos os campos obrigatórios.');
        }
    });
}

function showToast(message, type = 'success') {
    if (!toast) return;
    
    if (type === 'error') {
        toast.style.background = 'linear-gradient(135deg, var(--vermelho-suave) 0%, #EF5350 100%)';
    } else {
        toast.style.background = 'linear-gradient(135deg, var(--verde-brasil) 0%, #4CAF50 100%)';
    }
    
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (mobileToggle) {
                    mobileToggle.textContent = '☰';
                }
            }
        }
    });
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        if (mobileToggle) {
            mobileToggle.textContent = '☰';
        }
    }
});

document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        if (mobileToggle) {
            mobileToggle.textContent = '☰';
        }
    }
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.backdropFilter = 'blur(20px)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    }
});

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.card, .benefit-card, .pricing-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.tagName === 'INPUT' && e.target.type !== 'submit') {
        const form = e.target.closest('form');
        if (form && !form.querySelector('button[type="submit"]')) {
            e.preventDefault();
        }
    }
});
