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
});