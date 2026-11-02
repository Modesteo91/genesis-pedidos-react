/**
 * Constantes del módulo de Pedidos.
 * Estándar: constantes en UPPER_SNAKE_CASE.
 */

/** Tipos de trabajo que realiza el laboratorio dental. */
export const TIPOS_TRABAJO = [
  'Corona',
  'Puente',
  'Prótesis total',
  'Prótesis parcial',
  'Carillas',
  'Ortodoncia',
  'Guarda oclusal',
];

/** Estados posibles de un pedido (ciclo de vida). */
export const ESTADOS_PEDIDO = ['Recibido', 'En proceso', 'Terminado', 'Entregado'];

/** Valor por defecto del filtro de estado. */
export const FILTRO_TODOS = 'Todos';

/** Clave con la que se guardan los pedidos en localStorage. */
export const CLAVE_ALMACENAMIENTO = 'genesis.pedidos';

/** Estructura de un pedido vacío (usada por el formulario). */
export const PEDIDO_VACIO = {
  clinica: '',
  paciente: '',
  tipoTrabajo: TIPOS_TRABAJO[0],
  fechaEntrega: '',
  estado: ESTADOS_PEDIDO[0],
  observaciones: '',
};
