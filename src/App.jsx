/**
 * Componente raíz del módulo de Pedidos del laboratorio dental Genesis.
 *
 * Coordina el formulario, el filtro y la lista. Toda la lógica de datos
 * vive en el hook usePedidos; aquí solo se maneja el estado de la interfaz
 * (pedido en edición, filtro y búsqueda).
 */
import { useState } from 'react';
import FiltroEstado from './components/FiltroEstado.jsx';
import PedidoForm from './components/PedidoForm.jsx';
import PedidoLista from './components/PedidoLista.jsx';
import { FILTRO_TODOS } from './constants/pedidos.js';
import { usePedidos } from './hooks/usePedidos.js';

function App() {
  const { pedidos, agregar, modificar, borrar } = usePedidos();

  const [pedidoEnEdicion, setPedidoEnEdicion] = useState(null);
  const [filtroEstado, setFiltroEstado] = useState(FILTRO_TODOS);
  const [busqueda, setBusqueda] = useState('');

  /** Crea o actualiza según exista un pedido en edición. */
  const guardarPedido = (datos) => {
    if (pedidoEnEdicion) {
      modificar(pedidoEnEdicion.id, datos);
      setPedidoEnEdicion(null);
    } else {
      agregar(datos);
    }
  };

  /** Cambia solo el estado de un pedido desde la lista. */
  const cambiarEstado = (id, nuevoEstado) => modificar(id, { estado: nuevoEstado });

  /** Si se elimina el pedido que se estaba editando, se limpia el formulario. */
  const eliminarPedido = (id) => {
    borrar(id);
    if (pedidoEnEdicion?.id === id) {
      setPedidoEnEdicion(null);
    }
  };

  // Aplica el filtro de estado y la búsqueda por clínica o paciente.
  const textoBusqueda = busqueda.trim().toLowerCase();
  const pedidosVisibles = pedidos.filter((pedido) => {
    const coincideEstado = filtroEstado === FILTRO_TODOS || pedido.estado === filtroEstado;
    const coincideTexto =
      pedido.clinica.toLowerCase().includes(textoBusqueda) ||
      pedido.paciente.toLowerCase().includes(textoBusqueda);
    return coincideEstado && coincideTexto;
  });

  return (
    <div className="app">
      <header className="cabecera">
        <h1>Genesis Lab</h1>
        <p>Módulo de pedidos · Laboratorio dental</p>
      </header>

      <main className="contenido">
        <aside>
          <PedidoForm
            pedidoEnEdicion={pedidoEnEdicion}
            onGuardar={guardarPedido}
            onCancelar={() => setPedidoEnEdicion(null)}
          />
        </aside>

        <section>
          <div className="barra-herramientas">
            <input
              type="search"
              className="buscador"
              placeholder="Buscar por clínica o paciente"
              value={busqueda}
              onChange={(evento) => setBusqueda(evento.target.value)}
              aria-label="Buscar pedidos"
            />
            <FiltroEstado estadoActivo={filtroEstado} onCambiar={setFiltroEstado} />
          </div>

          <p className="contador">
            {pedidosVisibles.length} de {pedidos.length} pedidos
          </p>

          <PedidoLista
            pedidos={pedidosVisibles}
            onEditar={setPedidoEnEdicion}
            onEliminar={eliminarPedido}
            onCambiarEstado={cambiarEstado}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
