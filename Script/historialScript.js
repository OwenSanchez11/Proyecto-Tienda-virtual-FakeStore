document.addEventListener("click", (e) => {
    const nav = document.getElementById('nav');

    if(e.target.closest('#abrir')) {
        nav.classList.add('visible')
    }

    if(e.target.closest('#cerrar')) {
        nav.classList.remove('visible');
    }
})