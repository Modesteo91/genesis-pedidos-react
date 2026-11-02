/**
 * Punto de entrada de la aplicación.
 * Monta el componente raíz <App /> dentro del div#root de index.html.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
