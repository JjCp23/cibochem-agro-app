import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Rutas relativas: así el build funciona igual servido desde la raíz de un
  // dominio propio o desde el subdirectorio /nombre-del-repo/ de GitHub Pages,
  // sin tener que configurar el nombre del repositorio en ningún lado.
  base: './',
  server: { port: 5173, open: true },
});
