/**
 * Componente PedidoForm: formulario para crear o editar un pedido.
 *
 * Es un "componente controlado": el valor de cada campo vive en el estado de
 * React (useState) y se actualiza mediante el evento onChange.
 *
 * Props:
 *  - pedidoEnEdicion {Object|null}: pedido a editar; null cuando se crea uno nuevo.
 *  - onGuardar {Function}: recibe los datos válidos del formulario.
 *  - onCancelar {Function}: se invoca al cancelar la edición.
 */
import { useEffect, useState } from 'react';
import { ESTADOS_PEDIDO, PEDIDO_VACIO, TIPOS_TRABAJO } from '../constants/pedidos.js';
import { esValido, validarPedido } from '../utils/validaciones.js';

function PedidoForm({ pedidoEnEdicion, onGuardar, onCancelar }) {
  const [datos, setDatos] = useState(PEDIDO_VACIO);
  const [errores, setErrores] = useState({});

  // Cuando cambia el pedido en edición, se cargan sus datos en el formulario.
  useEffect(() => {
    setDatos(pedidoEnEdicion ?? PEDIDO_VACIO);
    setErrores({});
  }, [pedidoEnEdicion]);

  /** Evento onChange: actualiza el campo modificado. */
  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setDatos((actuales) => ({ ...actuales, [name]: value }));
  };

  /** Evento onSubmit: valida y envía los datos al componente padre. */
  const manejarEnvio = (evento) => {
    evento.preventDefault(); // Evita que el navegador recargue la página.

    const erroresEncontrados = validarPedido(datos);
    setErrores(erroresEncontrados);

    if (esValido(erroresEncontrados)) {
      onGuardar(datos);
      setDatos(PEDIDO_VACIO);
    }
  };

  const estaEditando = Boolean(pedidoEnEdicion);

  return (
    <form className="tarjeta formulario" onSubmit={manejarEnvio} noValidate>
      <h2>{estaEditando ? 'Editar pedido' : 'Nuevo pedido'}</h2>

      <label>
        Clínica
        <input
          type="text"
          name="clinica"
          value={datos.clinica}
          onChange={manejarCambio}
          placeholder="Ej: Clínica Sonrisa"
        />
        {errores.clinica && <span className="error">{errores.clinica}</span>}
      </label>

      <label>
        Paciente
        <input
          type="text"
          name="paciente"
          value={datos.paciente}
          onChange={manejarCambio}
          placeholder="Nombre del paciente"
        />
        {errores.paciente && <span className="error">{errores.paciente}</span>}
      </label>

      <div className="fila">
        <label>
          Tipo de trabajo
          <select name="tipoTrabajo" value={datos.tipoTrabajo} onChange={manejarCambio}>
            {TIPOS_TRABAJO.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </label>

        <label>
          Fecha de entrega
          <input
            type="date"
            name="fechaEntrega"
            value={datos.fechaEntrega}
            onChange={manejarCambio}
          />
          {errores.fechaEntrega && <span className="error">{errores.fechaEntrega}</span>}
        </label>
      </div>

      <label>
        Estado
        <select name="estado" value={datos.estado} onChange={manejarCambio}>
          {ESTADOS_PEDIDO.map((estado) => (
            <option key={estado} value={estado}>
              {estado}
            </option>
          ))}
        </select>
      </label>

      <label>
        Observaciones
        <textarea
          name="observaciones"
          rows="3"
          value={datos.observaciones}
          onChange={manejarCambio}
          placeholder="Color, material, indicaciones especiales..."
        />
        {errores.observaciones && <span className="error">{errores.observaciones}</span>}
      </label>

      <div className="acciones">
        <button type="submit" className="boton boton-primario">
          {estaEditando ? 'Guardar cambios' : 'Registrar pedido'}
        </button>
        {estaEditando && (
          <button type="button" className="boton" onClick={onCancelar}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default PedidoForm;
