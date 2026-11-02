/**
 * Componente PedidoLista: recorre la lista de pedidos y renderiza un PedidoItem
 * por cada uno. Muestra un mensaje cuando no hay resultados.
 *
 * Props:
 *  - pedidos {Array<Object>}: pedidos a mostrar.
 *  - onEditar, onEliminar, onCambiarEstado {Function}: se pasan a cada PedidoItem.
 */
import PedidoItem from './PedidoItem.jsx';

function PedidoLista({ pedidos, onEditar, onEliminar, onCambiarEstado }) {
  if (pedidos.length === 0) {
    return <p className="vacio">No hay pedidos para mostrar.</p>;
  }

  return (
    <div className="lista">
      {pedidos.map((pedido) => (
        // La prop key permite a React identificar cada elemento de la lista.
        <PedidoItem
          key={pedido.id}
          pedido={pedido}
          onEditar={onEditar}
          onEliminar={onEliminar}
          onCambiarEstado={onCambiarEstado}
        />
      ))}
    </div>
  );
}

export default PedidoLista;
