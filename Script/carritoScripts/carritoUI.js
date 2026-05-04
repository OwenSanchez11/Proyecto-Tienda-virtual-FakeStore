import { obtenerCarrito } from "./carritoStorage.js";

export function renderizarCarrito() {
  const carrito = obtenerCarrito();
  const contenedor = document.querySelector('.detalles-producto');

  if (!contenedor) return;

  let html = '';

  carrito.forEach(producto => {
    const subTotal = producto.price * producto.cantidad;

    html += `
      <div class="producto">
        <div class="img-art">
          <input type="checkbox" class="checkbox" data-id="${producto.id}" ${producto.seleccionado ? 'checked' : ''}>
          <img src="${producto.image}" alt="">
        </div>

        <div class="info-productos">
          <h2>${producto.title}</h2>

          <div class="buttons">
            <button class="btn-less" data-id="${producto.id}">
              <i class="bi bi-dash"></i>
            </button>

            <span>${producto.cantidad}</span>

            <button class="btn-more" data-id="${producto.id}">
              <i class="bi bi-plus"></i>
            </button>
          </div>
        </div>

        <span>$${subTotal.toFixed(2)}</span>
      </div>
    `;
  });

  contenedor.innerHTML = html;
}

export function calcularTotal() {
  const carrito = obtenerCarrito();
  const seleccionados = carrito.filter(p => p.seleccionado);

  const total = seleccionados.reduce((acc, p) => acc + (p.price * p.cantidad), 0);
  const cantidad = seleccionados.reduce((acc, p) => acc + p.cantidad, 0);

  const totalEl = document.querySelector('.monto-total');
  const cantidadEl = document.querySelector('.total-productos');

  if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
  if (cantidadEl) cantidadEl.textContent = `PRODUCTOS: ${cantidad}`;
}