//funcion para el menu hamburguesa y botón de cerrar
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

//traemos el contenedor y la id del html 
const contenedor = document.querySelector('.container-details');
//URLSearchParams sirve para leer los parametros de la URL que se le proporcionará
const params  = new URLSearchParams(window.location.search);
//en este caso, obtendremos el id del producto que traiga de la API para que lo muestre en la pagina
const id = params.get('id');

//renderizamos todo el contenido de la pagina
function renderProducto(data) {
    document.title = data.title;
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
                        <button class="btn-agregar" data-id="${data.id}">Agregar Al Carrito</button>
                        <button class="btn-comprar">Comprar ahora</button>
                    </div>
                </div>
    `;



}

// utilizamos un condicional para saber si obtiene una ID, y si le llega la ID entonces se ejecuta la función de renderProducto para que renderice 
//lo que le llegó de la id, sino que muestre un console.log explicando lo que falló
if (id) {
    obtenerId(id).then(data => {
        renderProducto(data);
    });
} else {
    console.log("No hay id en la URL");
}



