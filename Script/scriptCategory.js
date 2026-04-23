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

//renderizado de la página entera
const contenedor = document.querySelector('.cards-container');
const titulo = document.querySelector('.titulo-categoria');

const params = new URLSearchParams(window.location.search);
const grupo = params.get('cat');


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

const cambioBanner = (grupo) => {
    const data = banners[grupo] || banners.default;

    const bannerImg = document.querySelector('.header-banner img');
    bannerImg.src = data.img;
    document.querySelector('.titulo-categoria').textContent = data.titulo;
    document.querySelector('.banner-desc').textContent = data.descripcion;
    document.title = `${data.titulo}`;
}


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