import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react()],
    server: {
        host: 'localhost',
        port: 4200,
    },
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                background: 'src/services/Background.ts',
                options: 'src/options/options.html',
            },
            output: {
                entryFileNames: `[name].js`,
            },
        },
    },
});
