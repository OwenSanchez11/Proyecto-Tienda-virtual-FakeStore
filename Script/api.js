const obtenerDatos = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    return data;
}


const pintarCards = (contenedor, producto) => {
    contenedor.innerHTML = "";
    producto.forEach(producto => {
        contenedor.innerHTML += `
            <div class="card">
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
}

const renderProductos = async () => {
    const productos = await obtenerDatos();
     const contenedores = document.querySelectorAll('.novedades-card-container');
    pintarCards(contenedores[0], productos.slice(0, 6));
    pintarCards(contenedores[1], productos.slice(6, 12));
}

renderProductos();

const renderElectrodomesticosDestacados = async() => {
    const productos = await obtenerDatos();
    const contenedor = document.querySelector('.grid-cards-container');

    const electrodomesticos = productos.filter(
        producto => producto.category === "electronics"
    )

    contenedor.innerHTML = "";

    electrodomesticos.slice(0, 4).forEach(producto => {
        contenedor.innerHTML += `
            <div class="large-card">
                <div class="bg-blur" style="background-image: url('${producto.image}')"></div>
                <img src="${producto.image}" alt="">
                <div class="content-grid-card">
                    <h2>${producto.title}</h2>
                    <p>$${producto.price}</p>
                    <button>Ver más</button>
                </div>
            </div>
        
        `
    })
}

renderElectrodomesticosDestacados();