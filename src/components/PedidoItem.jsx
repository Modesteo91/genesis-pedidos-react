/**
 * Componente PedidoItem: tarjeta que muestra un pedido y sus acciones.
 *
 * Props:
 *  - pedido {Object}: datos del pedido.
 *  - onEditar {Function}: se invoca con el pedido a editar.
 *  - onEliminar {Function}: se invoca con el id del pedido a eliminar.
 *  - onCambiarEstado {Function}: se invoca con (id, nuevoEstado).
 */
import { ESTADOS_PEDIDO } from '../constants/pedidos.js';

/** Convierte una fecha AAAA-MM-DD en formato legible (DD/MM/AAAA). */
function formatearFecha(fechaIso) {
  const [anio, mes, dia] = fechaIso.split('-');
  return `${dia}/${mes}/${anio}`;
}

/** Convierte un estado en un nombre de clase CSS (ej: "En proceso" -> "en-proceso"). */
function claseEstado(estado) {
  return estado.toLowerCase().replace(/\s+/g, '-');
}

function PedidoItem({ pedido, onEditar, onEliminar, onCambiarEstado }) {
  /** Evento onClick de eliminar: pide confirmación antes de borrar. */
  const confirmarEliminacion = () => {
    const confirmado = window.confirm(`¿Eliminar el pedido ${pedido.id}?`);
    if (confirmado) {
      onEliminar(pedido.id);
    }
  };

  return (
    <article className="tarjeta pedido">
      <header className="pedido-encabezado">
        <div>
          <span className="pedido-id">{pedido.id}</span>
          <h3>{pedido.tipoTrabajo}</h3>
        </div>
        <span className={`estado estado-${claseEstado(pedido.estado)}`}>{pedido.estado}</span>
      </header>

      <dl className="pedido-datos">
        <div>
          <dt>Clínica</dt>
          <dd>{pedido.clinica}</dd>
        </div>
        <div>
          <dt>Paciente</dt>
          <dd>{pedido.paciente}</dd>
        </div>
        <div>
          <dt>Entrega</dt>
          <dd>{formatearFecha(pedido.fechaEntrega)}</dd>
        </div>
      </dl>

      {pedido.observaciones && <p className="pedido-notas">{pedido.observaciones}</p>}

      <footer className="acciones">
        <select
          aria-label="Cambiar estado"
          value={pedido.estado}
          onChange={(evento) => onCambiarEstado(pedido.id, evento.target.value)}
        >
          {ESTADOS_PEDIDO.map((estado) => (
            <option key={estado} value={estado}>
              {estado}
            </option>
          ))}
        </select>
        <button type="button" className="boton" onClick={() => onEditar(pedido)}>
          Editar
        </button>
        <button type="button" className="boton boton-peligro" onClick={confirmarEliminacion}>
          Eliminar
        </button>
      </footer>
    </article>
  );
}

export default PedidoItem;
