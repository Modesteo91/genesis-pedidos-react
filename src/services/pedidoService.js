/**
 * Servicio de acceso a datos del módulo de Pedidos.
 *
 * Implementa el CRUD (Crear, Leer, Actualizar, Eliminar) sobre localStorage.
 * Se aísla en esta capa para que, más adelante, pueda reemplazarse por llamadas
 * a una API REST o a la base de datos sin modificar los componentes.
 */
import { CLAVE_ALMACENAMIENTO } from '../constants/pedidos.js';

/**
 * Lee la lista completa de pedidos almacenados.
 *
 * @returns {Array<Object>} Lista de pedidos (vacía si no hay datos o están dañados).
 */
export function listarPedidos() {
  try {
    const datos = localStorage.getItem(CLAVE_ALMACENAMIENTO);
    return datos ? JSON.parse(datos) : [];
  } catch (error) {
    console.error('No fue posible leer los pedidos:', error);
    return [];
  }
}

/**
 * Guarda la lista completa de pedidos.
 *
 * @param {Array<Object>} pedidos - Lista a persistir.
 */
export function guardarPedidos(pedidos) {
  try {
    localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(pedidos));
  } catch (error) {
    console.error('No fue posible guardar los pedidos:', error);
  }
}

/**
 * Crea un pedido nuevo con id y fecha de registro.
 *
 * @param {Array<Object>} pedidos - Lista actual.
 * @param {Object} datos - Datos del formulario.
 * @returns {Array<Object>} Nueva lista con el pedido agregado al inicio.
 */
export function crearPedido(pedidos, datos) {
  const nuevoPedido = {
    ...datos,
    id: generarId(),
    fechaRegistro: new Date().toISOString(),
  };
  return [nuevoPedido, ...pedidos];
}

/**
 * Actualiza un pedido existente.
 *
 * @param {Array<Object>} pedidos - Lista actual.
 * @param {string} id - Identificador del pedido a modificar.
 * @param {Object} datos - Campos nuevos.
 * @returns {Array<Object>} Nueva lista con el pedido actualizado.
 */
export function actualizarPedido(pedidos, id, datos) {
  return pedidos.map((pedido) => (pedido.id === id ? { ...pedido, ...datos } : pedido));
}

/**
 * Elimina un pedido.
 *
 * @param {Array<Object>} pedidos - Lista actual.
 * @param {string} id - Identificador del pedido a eliminar.
 * @returns {Array<Object>} Nueva lista sin el pedido.
 */
export function eliminarPedido(pedidos, id) {
  return pedidos.filter((pedido) => pedido.id !== id);
}

/**
 * Genera un identificador único para un pedido.
 *
 * @returns {string} Identificador con formato PED-XXXXXX.
 */
function generarId() {
  const sufijo = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `PED-${sufijo}`;
}
