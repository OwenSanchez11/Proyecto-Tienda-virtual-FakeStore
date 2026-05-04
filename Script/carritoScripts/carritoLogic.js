import { obtenerCarrito, guardarCarrito } from "./carritoStorage.js";

export function actualizarCantidad(id, accion) {
  let carrito = obtenerCarrito();

  const indice = carrito.findIndex(item => item.id == id);

  if (indice !== -1) {
    if (accion === 'aumentar') carrito[indice].cantidad++;
    else if (accion === 'disminuir') carrito[indice].cantidad--;

    if (carrito[indice].cantidad <= 0) {
      carrito.splice(indice, 1);
    }

    guardarCarrito(carrito);
  }
}

export function agregarAlCarrito(producto) {
  let carrito = obtenerCarrito();

  const indice = carrito.findIndex(item => item.id === producto.id);

  if (indice !== -1) {
    carrito[indice].cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1, seleccionado: true });
  }

  guardarCarrito(carrito);
}

export function actualizarSeleccion(id, seleccionado) {
    let carrito = obtenerCarrito();

    const producto = carrito.find(item => item.id == id);

    if (producto) {
        producto.seleccionado = seleccionado;
    }

    guardarCarrito(carrito);
}

export function seleccionarTodos(seleccionado) {
    let carrito = obtenerCarrito();

    carrito.forEach(producto => {
        producto.seleccionado = seleccionado;
    });

  guardarCarrito(carrito);
}

export async function obtenerCatalogo() {
  const response = await fetch('https://fakestoreapi.com/products');
  const data = await response.json();
  return data;
}