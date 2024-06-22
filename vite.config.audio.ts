import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import packageJson from './package.json' assert { type: 'json' }
import { r } from './scripts/utility'

const { name } = packageJson

console.info(' ---> Starting Audio Content Script Build 🤞 <---')

export default defineConfig({
    plugins: [react()],

    build: {
        outDir: r('dist/contents'),
        emptyOutDir: false,

        lib: {
            entry: r('src/contents/playAudio.ts'),
            name: name,
            formats: ['iife']
        },

        rollupOptions: {
            output: {
                entryFileNames: 'playAudio.js',
                extend: true
            }
        }
    },

    publicDir: false
})
