import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import packageJson from './package.json' assert { type: 'json' }

const { name } = packageJson

console.info(' ---> Starting Confetti Content Script Build 🤞 <---')

export default defineConfig({
    plugins: [react()],

    build: {
        outDir: ('dist/contents'),
        emptyOutDir: false,

        lib: {
            entry: ('src/contents/playConfetti.ts'),
            name: name,
            formats: ['iife']
        },

        rollupOptions: {
            output: {
                entryFileNames: 'playConfetti.js',
                extend: true
            }
        }
    },

    publicDir: false
})