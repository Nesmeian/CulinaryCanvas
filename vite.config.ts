import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => ({
    base: '/CulinaryCanvas/',
    plugins: [react()],
    server: {
        host: true,
        port: 3000,
    },
    build: {
        outDir: 'dist',
    },
    resolve: {
        alias: {
            '~': resolve(__dirname, 'src'),
            '@public': resolve(__dirname, 'public'),
        },
    },
}));
