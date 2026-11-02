/**
 * Funciones de validación del formulario de pedidos.
 * Son funciones puras: reciben datos y devuelven resultados, sin efectos secundarios.
 */

/**
 * Valida los datos de un pedido.
 *
 * @param {Object} pedido - Datos capturados en el formulario.
 * @returns {Object} Objeto con un mensaje de error por cada campo inválido.
 *                   Si no hay errores, devuelve un objeto vacío.
 */
export function validarPedido(pedido) {
  const errores = {};

  if (pedido.clinica.trim().length < 3) {
    errores.clinica = 'Ingrese el nombre de la clínica (mínimo 3 caracteres).';
  }

  if (pedido.paciente.trim().length < 3) {
    errores.paciente = 'Ingrese el nombre del paciente (mínimo 3 caracteres).';
  }

  if (!pedido.fechaEntrega) {
    errores.fechaEntrega = 'Seleccione la fecha de entrega.';
  }

  if (pedido.observaciones.length > 200) {
    errores.observaciones = 'Las observaciones no pueden superar 200 caracteres.';
  }

  return errores;
}

/**
 * Indica si un objeto de errores está vacío.
 *
 * @param {Object} errores - Resultado de validarPedido.
 * @returns {boolean} true si no hay errores.
 */
export function esValido(errores) {
  return Object.keys(errores).length === 0;
}
