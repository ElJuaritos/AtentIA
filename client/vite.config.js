import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientNodeModules = path.resolve(__dirname, 'node_modules');
const device3dSrc = path.resolve(__dirname, '../device-3d/src');

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const base = env.VITE_BASE_PATH || '/';

  return {
    plugins: [react()],
    base,
    resolve: {
      alias: {
        '@device3d': device3dSrc,
        // Resuelve R3F desde client/node_modules para archivos en device-3d/
        '@react-three/fiber': path.join(clientNodeModules, '@react-three/fiber'),
        '@react-three/drei': path.join(clientNodeModules, '@react-three/drei'),
        three: path.join(clientNodeModules, 'three'),
      },
      dedupe: ['react', 'react-dom', 'three', '@react-three/fiber', '@react-three/drei'],
    },
    server: {
      port: 5173,
      fs: {
        allow: [path.resolve(__dirname, '..')],
      },
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
        },
      },
    },
    optimizeDeps: {
      include: ['three', '@react-three/fiber', '@react-three/drei'],
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            motion: ['framer-motion'],
            three: ['three', '@react-three/fiber', '@react-three/drei'],
          },
        },
      },
    },
  };
});
