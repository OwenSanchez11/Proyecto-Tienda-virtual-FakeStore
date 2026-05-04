import { 
  actualizarCantidad, 
  actualizarSeleccion, 
  agregarAlCarrito,
  seleccionarTodos 
} from './carritoLogic.js';
import { obtenerCarrito } from './carritoStorage.js';

import { renderizarCarrito, calcularTotal } from './carritoUI.js';

export function initEventosCarrito() {

  document.addEventListener("change", (e) => {

    // checkbox individual
    if (e.target.classList.contains('checkbox')) {
      const id = e.target.dataset.id;
      const estado = e.target.checked;

      actualizarSeleccion(id, estado);
      calcularTotal();
    }

    // seleccionar todos
    if (e.target.classList.contains('check-all')) {
      const estado = e.target.checked;

      seleccionarTodos(estado);
      renderizarCarrito();
      calcularTotal();
    }

  });

  document.addEventListener("click", (e) => {

    const nav = document.getElementById('nav');
    if (e.target.closest('#abrir')) nav.classList.add('visible');
    if (e.target.closest('#cerrar')) nav.classList.remove('visible');

    const btnAgregar = e.target.closest('.btn-agregar');
    if (btnAgregar) {
      const idClick = btnAgregar.dataset.id;
      const catalogo = obtenerCarrito();
      const producto = catalogo.find(p => p.id == idClick);

      if (producto) {
        agregarAlCarrito(producto);
        alert('Producto agregado');
      }
    }

    const btnMore = e.target.closest('.btn-more');
    const btnLess = e.target.closest('.btn-less');

    if (btnMore) {
      actualizarCantidad(btnMore.dataset.id, 'aumentar');
      renderizarCarrito();
      calcularTotal();
    }

    if (btnLess) {
      actualizarCantidad(btnLess.dataset.id, 'disminuir');
      renderizarCarrito();
      calcularTotal();
    }

  });
}