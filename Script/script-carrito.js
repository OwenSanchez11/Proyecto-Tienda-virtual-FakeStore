//aquí solo tengo esta funcionalidad de igual manera que en las demás paginas para nada más
//darle la funcionalidad al menú hamburguesa
document.addEventListener('click', (e) => {
    const nav = document.getElementById('nav');

    if(e.target.closest('#abrir')) {
        nav.classList.add('visible')
    }

    if(e.target.closest('#cerrar')) {
        nav.classList.remove('visible');
    }
})