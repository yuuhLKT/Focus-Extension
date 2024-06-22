import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import packageJson from './package.json' assert { type: 'json' }
import { isDev, r } from './scripts/utility'

const { name } = packageJson

console.info(' ---> Starting Content Script Build 🤞 <---')

export default defineConfig({
    plugins: [react()],

    resolve: {
        alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
    },

    define: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    },

    build: {
        outDir: r('dist/contents'),
        cssCodeSplit: false,
        emptyOutDir: false,
        sourcemap: isDev ? 'inline' : false,

        lib: {
            entry: r('src/contents/blockIndex.tsx'),
            name: name,
            formats: ['iife']
        },

        rollupOptions: {
            output: {
                entryFileNames: 'content.js',
                extend: true
            }
        }
    },

    publicDir: false
})
