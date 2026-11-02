// Configuración de Vite: herramienta de construcción y servidor de desarrollo.
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
