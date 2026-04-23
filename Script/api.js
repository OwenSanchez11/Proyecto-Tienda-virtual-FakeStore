const obtenerDatos = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    return data;
}

//función para generar mis cards en el contenedor de mi html
const pintarCards = (contenedor, producto) => {
    let html= "";

    producto.forEach(producto => {
        html += `
            <div class="card" data-action="ver-producto" data-id="${producto.id}">
                    <div class="card-img">
                        <img src="${producto.image}">
                    </div>
                    <div class="footer-card">
                    <h3>${producto.title}</h3>
                    <p>$${producto.price}</p>
                    <button>Agregar al carrito</button>
                    </div>
            </div>
        
        `;
    });
    contenedor.innerHTML = html;
}

//función en la cual llamo a 'pintarCards utilizando im .slice para llamar solo unos cuantos productos
//y colocarlas en mis cards que se encuentran en novedades-card-container
const renderProductos = async () => {
    const productos = await obtenerDatos();
    const contenedores = document.querySelectorAll('.novedades-card-container');
    pintarCards(contenedores[0], productos.slice(0, 6));
    pintarCards(contenedores[1], productos.slice(6, 12));
}

renderProductos();

//funcion para recortar el texto que traigo de la API
const recortarTexto = (texto, max) => {
    return texto.length > max 
        ? texto.slice(0, max) + "..." 
        : texto;
}

//función para renderizar los datos de la categoria tecnología
const renderElectrodomesticosDestacados = async() => {
    const productos = await obtenerDatos();
    const contenedor = document.querySelector('.grid-cards-container');

    const electrodomesticos = productos.filter(
        producto => producto.category === "electronics"
    )

    contenedor.innerHTML = "";

    electrodomesticos.slice(0, 4).forEach(producto => {
        contenedor.innerHTML += `
            <div class="large-card" data-action="ver-producto" data-id="${producto.id}">
                <div class="bg-blur" style="background-image: url('${producto.image}')"></div>
                <img src="${producto.image}" alt="">
                <div class="content-grid-card">
                    <h2 title="${producto.title}">
                        ${recortarTexto(producto.title, 30)}
                    </h2>
                    <p>$${producto.price}</p>
                    <button>Ver más</button>
                </div>
            </div>
        `
    })
}

renderElectrodomesticosDestacados();

//función para obtener el id de cada producto y redirigir a la página de caracteristicas del producto

document.addEventListener('click', (e) => {
    const element = e.target.closest('[data-action]');

    if(!element) return;

    const action = element.dataset.action;

    if(action === 'ver-producto') {
        const id = element.dataset.id;
        window.location.href =`Pages/producto.html?id=${id}`;
    }

})