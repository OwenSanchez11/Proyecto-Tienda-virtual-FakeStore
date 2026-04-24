//función en el que utilizo fetch para que me devuelva los productos de la API
async function obtenerProductosPorCategoria(categoria) {
    const res = await fetch(`https://fakestoreapi.com/products/category/${categoria}`);
    const productos = await res.json();

    return productos;
}



//Botones para el menú en mobile
document.addEventListener('click', (e) => {
    const nav = document.getElementById('nav');

    if(e.target.closest('#abrir')) {
        nav.classList.add('visible')
    }

    if(e.target.closest('#cerrar')) {
        nav.classList.remove('visible');
    }
})

//renderizado de la página entera según cada categoria
const contenedor = document.querySelector('.cards-container');
const titulo = document.querySelector('.titulo-categoria');

const params = new URLSearchParams(window.location.search);
const grupo = params.get('cat');

//guardo los objetos en una variable banners para que guarden tanto el titulo, la imagen y la descripción que saldrá
//según la categoria que elijan
const banners = {
    "men's clothing": {
        img: "../src/img/men's clothing.jpg",
        titulo: "Moda para hombres",
        descripcion: "Lo mejor para caballeros"
    },
    "women's clothing": {
        img: "../src/img/banner-women.jpg",
        titulo: "Moda para Damas",
        descripcion: "Lo mejor en ropa de Damas"
    },
    electronics: {
        img: "../src/img/tecnología.jpg",
        titulo: "Tecnología",
        descripcion: "Lo último en tecnología"
    },
    jewelery: {
        img: "../src/img/joyeria.jpg",
        titulo: "Jewerely",
        descripcion: "Nuestras mejores prendas y joyería"
    },
    default: {
        img: "../src/img/banner.png",
        titulo: "Todos los productos",
        descripcion: "Explora nuestro catálogo"
    }

}

//función que elije el banner que se colocará
const cambioBanner = (grupo) => {

    //Busca en el objeto "banners" usando la clave "grupo"
    //Si NO existe esa categoría, usa "banners.default"
    const data = banners[grupo] || banners.default;

    // Cambia la imagen del banner dinámicamente
    // data.img viene del objeto banners
    const bannerImg = document.querySelector('.header-banner img');
    bannerImg.src = data.img;
    document.querySelector('.titulo-categoria').textContent = data.titulo;
    document.querySelector('.banner-desc').textContent = data.descripcion;
    document.title = `${data.titulo}`;
}

//función que se utiliza para renderizar las cards dentro de la pagina de categorias
function renderProductos(productos) {
    contenedor.innerHTML = "";

    productos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add('card');
        card.dataset.id = producto.id;

        card.innerHTML = `
            <div class="card-img"">
                <img src="${producto.image}" alt="">
            </div>
            <div class="card-footer">
                <h2>${producto.title}</h2>
                <p>$${producto.price}</p>
                <button>Agregar al carrito</button>
            </div>
        `;

        contenedor.appendChild(card);
    });
}

//función que muestra y obtiene todos los productos de cada categoria e inicia todo lo demás
//tanto el cambio de banner como la renderización de los productos
async function init() {
    let productos=[];


    if (grupo) {
        productos = await obtenerProductosPorCategoria(grupo);
        titulo.textContent = grupo;
    } else {
        titulo.textContent = "Todos los productos";
    }
    
    cambioBanner(grupo);
    renderProductos(productos);
}

init();


//obtener id
document.addEventListener('click', (e) => {
    const card = e.target.closest('.card');

    if(!card) return;

    const id = card.dataset.id;

    if(!id) return;

    window.location.href =`./producto.html?id=${id}`;
});