document.addEventListener('click', (e) => {
    const nav = document.getElementById('nav');

    if(e.target.closest('#abrir')) {
        nav.classList.add('visible')
    }

    if(e.target.closest('#cerrar')) {
        nav.classList.remove('visible');
    }
})


const sliders = document.querySelectorAll('.slider');

sliders.forEach(slider => {
    const scrollLeftBtn = slider.querySelector('.scroll-left');
    const scrollRightBtn = slider.querySelector('.scroll-right');
    const container = slider.querySelector('.novedades-card-container');

    scrollLeftBtn.addEventListener('click', () => {
        container.scrollLeft -= 200;
    });

    scrollRightBtn.addEventListener('click', () => {
        container.scrollLeft += 200;
    });
});