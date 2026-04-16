document.addEventListener('click', (e) => {
    const nav = document.getElementById('nav');

    if(e.target.closest('#abrir')) {
        nav.classList.add('visible')
    }

    if(e.target.closest('#cerrar')) {
        nav.classList.remove('visible');
    }
})

//captura de id y llamado de la API

const obtenerId = async (id) => {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await res.json();
    return data;
}

const contenedor = document.querySelector('.container-details');
const params  = new URLSearchParams(window.location.search);
const id = params.get('id');

function renderProducto(data) {
    contenedor.innerHTML = "";

    contenedor.innerHTML = `
                <div class="img-product-container">
                    <img src="${data.image}" alt="">
                </div>

                <div class="text-details">
                    <h3>PRODUCTO</h3>
                    <h2>${data.title}</h2>
                    <p id="precio">$${data.price}</p>
                    <h3 id="titulo-descripcion">Descripción del producto</h3>
                    <p id="descripcion">${data.description}</p>
                    <p id="rating">Puntuación: ${data.rating.rate}</p>
                    <div class="buttons">
                        <button class="btn-carrito">Agregar Al Carrito</button>
                        <button class="btn-comprar">Comprar ahora</button>
                    </div>
                </div>
    `;



}

// 5. Ejecutar todo
if (id) {
    obtenerId(id).then(data => {
        renderProducto(data);
    });
} else {
    console.log("No hay id en la URL");
}



