const nav = document.getElementById('nav');
const abrir = document.getElementById('abrir');
const cerrar = document.getElementById('cerrar');


abrir.addEventListener('click', () => {
    nav.classList.add('visible');
})

cerrar.addEventListener('click', () => {
    nav.classList.remove('visible');
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