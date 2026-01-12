document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica do Carrossel ---
    const track = document.querySelector(".carousel-track");
    if (track) {
        const slides = Array.from(track.children);
        const nextButton = document.querySelector(".carousel-button.next");
        const prevButton = document.querySelector(".carousel-button.prev");

        const slideWidth = slides[0].getBoundingClientRect().width;
        let currentSlide = 0;
        const totalSlides = slides.length;

        // Organiza os slides um ao lado do outro
        const setSlidePosition = (slide, index) => {
            // A lógica de posicionamento agora é tratada pelo flexbox, 
            // mas o cálculo da largura é importante para o transform.
        };
        slides.forEach(setSlidePosition);

        const moveToSlide = (track, currentSlide, targetSlide) => {
            const slideWidth = slides[0].getBoundingClientRect().width;
            track.style.transform = `translateX(-${slideWidth * targetSlide}px)`;
            currentSlide = targetSlide;
            return currentSlide;
        };

        // Botão Próximo
        nextButton.addEventListener('click', e => {
            let targetSlide = (currentSlide + 1) % totalSlides;
            currentSlide = moveToSlide(track, currentSlide, targetSlide);
        });

        // Botão Anterior
        prevButton.addEventListener('click', e => {
            let targetSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            currentSlide = moveToSlide(track, currentSlide, targetSlide);
        });
        
        // Atualiza a largura do slide se a janela for redimensionada
        window.addEventListener('resize', () => {
             currentSlide = moveToSlide(track, currentSlide, currentSlide);
        });
    }

    // --- Lógica do Cronômetro ---
    const dataInicial = new Date("2025-01-01T00:00:00");
    const timerElement = document.getElementById("timer");

    function atualizaTempo() {
        const agora = new Date();
        const diferenca = agora - dataInicial;

        const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24);
        const minutos = Math.floor((diferenca / 1000 / 60) % 60);
        const segundos = Math.floor((diferenca / 1000) % 60);

        if(timerElement){
            timerElement.textContent = 
            `${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos`;
        }
    }

    // Chama a função uma vez para não haver atraso e depois a cada segundo
    atualizaTempo(); 
    setInterval(atualizaTempo, 1000);
    // --- Lógica do Quiz Romântico ---
    const quizData = [
        {
            question: "Nossa viagem dos sonhos:",
            options: ["Maldivas", "Grecia", "Japão", "Noruega"],
            answer: 1
        },
        {
            question: "Show que temos vontade de ir:",
            options: ["Coldplay", "Embaixador", "Anitta", "Alok"],
            answer: 1
        },
        {
            question: "Sonhos para cumprir esse ano:",
            options: ["Viajar para o exterior", "Correr uma meia maratona juntos", "Comprar um carro", "Fazer um curso de culinária"],
            answer: 1
        },
        {
            question: "O quanto o JV me ama?",
            options: ["Mais que chocolate", "Daqui até o sol vezes quatrilhões", "Como um filme romântico", "Como pizza todo dia"],
            answer: 1
        }
    ];

    const quizContainer = document.getElementById('quiz-container');
    const quizSubmit = document.getElementById('quiz-submit');
    const quizResult = document.getElementById('quiz-result');

    if (quizContainer) {
        quizData.forEach((q, idx) => {
            const div = document.createElement('div');
            div.className = 'quiz-question';
            div.innerHTML = `<strong>${q.question}</strong>`;
            q.options.forEach((opt, oidx) => {
                const label = document.createElement('label');
                label.innerHTML = `<input type="radio" name="q${idx}" value="${oidx}"> ${opt}`;
                div.appendChild(label);
            });
            quizContainer.appendChild(div);
        });
        quizSubmit.style.display = 'inline-block';
    }

    if (quizSubmit) {
        quizSubmit.addEventListener('click', () => {
            let score = 0;
            quizData.forEach((q, idx) => {
                const radios = document.querySelectorAll(`input[name='q${idx}']`);
                radios.forEach((radio, oidx) => {
                    // Remove marcador anterior
                    let label = radio.parentElement;
                    label.querySelectorAll('.quiz-marker').forEach(e => e.remove());
                    // Adiciona marcador se foi respondido
                    if (radio.checked) {
                        if (oidx === q.answer) {
                            score++;
                            label.insertAdjacentHTML('beforeend', '<span class="quiz-marker quiz-correct">✔️</span>');
                        } else {
                            label.insertAdjacentHTML('beforeend', '<span class="quiz-marker quiz-wrong">❌</span>');
                        }
                    } else if (oidx === q.answer) {
                        // Mostra qual era a resposta certa se errou
                        label.insertAdjacentHTML('beforeend', '<span class="quiz-marker quiz-correct">✔️</span>');
                    }
                });
            });
            let msg = '';
            if (score === quizData.length) {
                msg = 'Parabéns! Você conhece muito bem nossa história! 💖';
            } else if (score >= quizData.length - 1) {
                msg = 'Quase perfeito! Você lembra de quase tudo! 😍';
            } else {
                msg = 'O importante é o amor! Vamos criar novas memórias juntos! 💌';
            }
            quizResult.textContent = `LINDA PERFEITA, você acertou ${score} de ${quizData.length}. ${msg}`;
        });
    }
});