const teachersData = {
    jordan: {
        name: "Professor Jordan",
        img: "img/jordan.JPG",
        bio: "Comunicativo e apaixonado por culturas, Jordan viveu 5 anos no Brasil e fala inglês e português fluentemente! Especialista em ensinar brasileiros a falarem inglês e estrangeiros a dominarem o português do Brasil. Aulas dinâmicas, reais e cheias de troca cultural. Com experiência em ensino de idiomas há mais de 8 anos, Jordan traz uma abordagem personalizada que se adapta às necessidades de cada aluno.",
        specialties: ["Inglês Britânico", "Português para Estrangeiros", "Intercâmbio Cultural"],
        experience: "8+ anos"
    },
    livia: {
        name: "Professora Lívia",
        img: "img/livia.JPG",
        bio: "Apaixonada por idiomas, música e séries, Lívia transforma o aprendizado em uma experiência divertida e real! Fluente em inglês, espanhol e português; especialista em pronúncia, entonação e ritmo. Formada em Letras com especialização em Linguística Aplicada, utiliza métodos modernos e recursos audiovisuais para tornar cada aula única e envolvente.",
        specialties: ["Pronúncia", "Espanhol", "Inglês com Música"],
        experience: "6+ anos"
    },
    gustavo: {
        name: "Professor Gustavo",
        img: "img/gustavo(1).jpg",
        bio: "Especialista em inglês californiano, estudou na Universidade da Califórnia e domina o sotaque e expressões típicas dos EUA. Ajuda alunos a se comunicarem em inglês com fluência e estilo americano. Com background em comunicação internacional, Gustavo foca em situações reais do cotidiano, preparando os alunos para conversas autênticas em qualquer contexto.",
        specialties: ["Inglês Americano", "Business English", "Preparação para Viagens"],
        experience: "7+ anos"
    },
    ceu: {
        name: "Professora Celine",
        img: "img/celine.JPG",
        bio: "Tenho 25 anos, sou de Hamburgo. Formada em copywriting, viajo o mundo e desde 2023 ensino com alegria; aprendo rápido e estou animada pra crescer junto com meus alunos. Minha abordagem é fresca e contemporânea, focada em conversação prática e vocabulário atualizado que você realmente usará no dia a dia ou em viagens.",
        specialties: ["Alemão", "Inglês para Viagens", "Copywriting em Inglês"],
        experience: "2+ anos"
    },

};

const modal = document.getElementById('teacher-modal');
const modalClose = document.querySelector('.modal-close');
const modalTeacherName = document.getElementById('modal-teacher-name');
const modalTeacherImage = document.getElementById('modal-teacher-image');
const modalTeacherBio = document.getElementById('modal-teacher-bio');

verPerfilButtons.forEach(button => {
    button.addEventListener('click', () => {
        const teacherId = button.getAttribute('data-teacher'); // jordan, livia, gustavo, ceu
        const teacher = teachersData[teacherId];

        if (teacher) {
            modalTeacherName.textContent = teacher.name;
            modalTeacherImage.src = teacher.img;
            modalTeacherImage.alt = teacher.name;

            // Atualiza o botão existente
            const modalButton = modal.querySelector('.marcar-aula');
            if (modalButton) {
                modalButton.setAttribute('data-whatsapp', `professor-${teacherId}`);
            }

            let modalContent = `
                <p>${teacher.bio}</p>
                <div class="teacher-details" style="margin-top: 1.5rem; padding: 1.5rem; background: var(--cinza-claro); border-radius: 10px;">
                    <h4 style="color: var(--azul-real); margin-bottom: 1rem;">📚 Especialidades</h4>
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
                        ${teacher.specialties.map(spec => 
                            `<span style="background: var(--azul-real); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem;">${spec}</span>`
                        ).join('')}
                    </div>
                    <p><strong>Experiência:</strong> ${teacher.experience}</p>
                </div>
            `;

            modalTeacherBio.innerHTML = modalContent;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    });
});



if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

if (modal) {
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeModal();
    }
});

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; 
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('marcar-aula')) {
        closeModal();
        const messageType = e.target.getAttribute('data-whatsapp') || 'default';
        setTimeout(() => {
            openWhatsApp(messageType);
        }, 300);
    }
});





if (window.location.pathname.includes('professores.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        const teacherCards = document.querySelectorAll('.teachers .card');
        
        teacherCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('fade-in-up');
        });
    });
}