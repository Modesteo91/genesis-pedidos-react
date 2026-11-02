# Genesis Lab · Módulo de Pedidos (React)

Evidencia **AA3_EV01** · Análisis y desarrollo de software · Ficha 3336915
Aprendiz: Alejandro Sepúlveda Ardila

Módulo de **gestión de pedidos** del software del laboratorio dental **Genesis** (proyecto del chatbot de atención). Está desarrollado en **React 18** con **Vite**, aplicando los artefactos del ciclo de software ya elaborados: casos de uso, historias de usuario, prototipo/interfaz gráfica (paleta azul petróleo + ámbar) y los informes técnicos de versionamiento (Git/GitHub, GitHub Flow) y estándares de codificación (guía de estilo de Google para JavaScript).

## Historias de usuario cubiertas

| Historia | Implementación |
|---|---|
| Como clínica, quiero registrar un pedido de trabajo dental | `PedidoForm` + `crearPedido` |
| Como técnico, quiero consultar los pedidos y buscarlos | `PedidoLista`, buscador y `FiltroEstado` |
| Como técnico, quiero actualizar el estado de un pedido | selector de estado en `PedidoItem` |
| Como administrador, quiero editar o eliminar un pedido | `PedidoForm` (modo edición) y botón Eliminar |

## Conceptos de React aplicados

- **Componentes** de función y **props** (`PedidoForm`, `PedidoLista`, `PedidoItem`, `FiltroEstado`).
- **JSX** para describir la interfaz.
- **Estado** con `useState` y efectos con `useEffect`.
- **Eventos**: `onChange`, `onSubmit`, `onClick`.
- **Renderizado de listas** con la prop `key` y **renderizado condicional**.
- **Hook personalizado** `usePedidos` para separar la lógica de los componentes.

## Estructura

```
src/
├── App.jsx                  Componente raíz
├── main.jsx                 Punto de entrada
├── components/              Componentes de interfaz
├── hooks/usePedidos.js      Estado y operaciones del módulo
├── services/pedidoService.js  CRUD (localStorage, reemplazable por API)
├── utils/validaciones.js    Validación del formulario
├── constants/pedidos.js     Constantes (tipos, estados)
└── styles/App.css           Estilos
```

## Estándares de codificación

- Componentes y clases en `PascalCase`; variables, funciones y hooks en `camelCase`; constantes en `UPPER_SNAKE_CASE`; archivos de componentes en `PascalCase.jsx`.
- Nombres en español, coherentes con el dominio del laboratorio.
- Comentarios JSDoc en cada componente y función.
- Indentación de 2 espacios, comillas simples, punto y coma, funciones con una sola responsabilidad.

## Ejecución

Requiere Node.js 18 o superior.

```bash
npm install
npm run dev      # servidor de desarrollo en http://localhost:5173
npm run build    # compilación de producción en /dist
```

Los datos se guardan en el `localStorage` del navegador; en una siguiente evidencia puede conectarse a una API o base de datos modificando solo `pedidoService.js`.

## Versionamiento

Proyecto versionado con Git siguiendo la estrategia **GitHub Flow** y commits descriptivos. Enlace del repositorio en `ENLACE_REPOSITORIO.txt` (carpeta raíz de la entrega).
