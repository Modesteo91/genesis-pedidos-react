/**
 * Hook personalizado que centraliza el estado y las operaciones de pedidos.
 *
 * Usa useState para guardar la lista y useEffect para sincronizarla con
 * localStorage cada vez que cambia.
 */
import { useEffect, useState } from 'react';
import {
  actualizarPedido,
  crearPedido,
  eliminarPedido,
  guardarPedidos,
  listarPedidos,
} from '../services/pedidoService.js';

/**
 * @returns {{
 *   pedidos: Array<Object>,
 *   agregar: Function,
 *   modificar: Function,
 *   borrar: Function
 * }} Lista de pedidos y funciones para modificarla.
 */
export function usePedidos() {
  // La función inicial se ejecuta una sola vez, al montar el componente.
  const [pedidos, setPedidos] = useState(() => listarPedidos());

  // Efecto: persiste la lista cada vez que cambia.
  useEffect(() => {
    guardarPedidos(pedidos);
  }, [pedidos]);

  /** Agrega un pedido nuevo. */
  const agregar = (datos) => setPedidos((actuales) => crearPedido(actuales, datos));

  /** Modifica un pedido existente. */
  const modificar = (id, datos) =>
    setPedidos((actuales) => actualizarPedido(actuales, id, datos));

  /** Elimina un pedido. */
  const borrar = (id) => setPedidos((actuales) => eliminarPedido(actuales, id));

  return { pedidos, agregar, modificar, borrar };
}
