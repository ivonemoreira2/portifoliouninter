
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-list a');

    // Alterna a classe 'active' no menu ao clicar no botão hambúrguer
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Animação simples do botão (opcional)
        mobileMenuBtn.classList.toggle('open');
    });

    // Fecha o menu ao clicar em um link (âncora)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });


    // --- 2. Alternador de temas ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Verifica se há preferência salva no LocalStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.className = savedTheme;
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-theme')) {
            body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        } else {
            body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light-theme');
        }
    });


    // --- 3. VALIDAÇÃO E SIMULAÇÃO DE ENVIO DO FORMULÁRIO ---
    const contactForm = document.getElementById('contact-form');
    const successModal = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const closeModalIcon = document.querySelector('.close-modal');

    // Função para validar formato de e-mail usando Expressão Regular (Regex)
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Função para mostrar/esconder mensagens de erro visualmente
    // Adiciona ou remove a classe 'error' no elemento pai do campo.
    function toggleError(fieldId, show) {
        const formGroup = document.getElementById(fieldId).parentElement;
        if (show) {
            formGroup.classList.add('error');
        } else {
            formGroup.classList.remove('error');
        }
    }

    // Evento de submissão do formulário
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o envio real do formulário para o servidor

        // Captura os valores dos campos e remove espaços em branco extras
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();

        let isValid = true;

        // Validação do campo Nome (obrigatório)
        if (nome === "") {
            toggleError('nome', true);
            isValid = false;
        } else {
            toggleError('nome', false);
        }

        // Validação do campo E-mail (obrigatório e formato válido)
        if (!isValidEmail(email)) {
            toggleError('email', true);
            isValid = false;
        } else {
            toggleError('email', false);
        }

        // Validação do campo Mensagem (obrigatório)
        if (mensagem === "") {
            toggleError('mensagem', true);
            isValid = false;
        } else {
            toggleError('mensagem', false);
        }

        // Se todos os campos estiverem válidos, simula o envio
        if (isValid) {
            // Altera o estado do botão para indicar processamento
            const submitBtn = document.getElementById('submit-btn');
            submitBtn.innerText = "Enviando...";
            submitBtn.disabled = true;

            // Simula o envio // loading
            setTimeout(() => {
                // Limpa os campos do formulário após o "envio"
                contactForm.reset();
                
                // Restaura o botão ao estado original
                submitBtn.innerText = "Enviar Mensagem";
                submitBtn.disabled = false;

                // Exibe o modal de confirmação (caixa modal informativa)
                successModal.style.display = "block";
            }, 1500);
        }
    });

    // --- 4. CONTROLE DO MODAL ---
    function closeModal() {
        successModal.style.display = "none";
    }

    closeModalBtn.addEventListener('click', closeModal);
    closeModalIcon.addEventListener('click', closeModal);

    // Fecha o modal ao clicar fora dele
    window.addEventListener('click', (e) => {
        if (e.target === successModal) {
            closeModal();
        }
    });


    // --- 5. EFEITO DE SCROLL NO HEADER ---
    window.addEventListener('scroll', () => {
        const header = document.getElementById('main-header');
        if (window.scrollY > 50) {
            header.style.padding = "10px 0";
            header.style.backgroundColor = "var(--header-bg)";
        } else {
            header.style.padding = "15px 0";
        }
    });

    // --- 6. Animações e efeitos especiais ---
    
    // Parallax ao mover o mouse
    document.addEventListener('mousemove', (e) => {
        const blobs = document.querySelectorAll('.blob');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 20;
            const xOffset = (x - 0.5) * speed;
            const yOffset = (y - 0.5) * speed;
            blob.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });

    // Scroll Reveal (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));
});



