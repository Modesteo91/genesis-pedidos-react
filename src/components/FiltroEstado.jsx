/**
 * Componente FiltroEstado: botones para filtrar la lista por estado del pedido.
 *
 * Props:
 *  - estadoActivo {string}: filtro seleccionado actualmente.
 *  - onCambiar {Function}: recibe el nuevo estado seleccionado.
 */
import { ESTADOS_PEDIDO, FILTRO_TODOS } from '../constants/pedidos.js';

const OPCIONES = [FILTRO_TODOS, ...ESTADOS_PEDIDO];

function FiltroEstado({ estadoActivo, onCambiar }) {
  return (
    <div className="filtros" role="group" aria-label="Filtrar por estado">
      {OPCIONES.map((opcion) => (
        <button
          key={opcion}
          type="button"
          className={`chip ${estadoActivo === opcion ? 'chip-activo' : ''}`}
          onClick={() => onCambiar(opcion)}
        >
          {opcion}
        </button>
      ))}
    </div>
  );
}

export default FiltroEstado;
