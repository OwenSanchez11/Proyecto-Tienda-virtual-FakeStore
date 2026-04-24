//aquí utilizo un event listener en el html que detecta cuando se presionan en los botones  
//del modo mobile, tanto el menú hamburguesa como el de cerrar 
document.addEventListener('click', (e) => {
    const nav = document.getElementById('nav');

    if(e.target.closest('#abrir')) {
        nav.classList.add('visible')
    }

    if(e.target.closest('#cerrar')) {
        nav.classList.remove('visible');
    }
})

//esta es la función que utilizo yo para darle ese movimiento al contenedor slider de las cards
//que junto los botones harán ese movimiento
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