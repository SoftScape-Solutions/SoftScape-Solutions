'use strict';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({
            // Enable Fast Refresh for better development experience
            fastRefresh: true
        })
    ],
    
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },

    // Build optimizations
    build: {
        // Output directory
        outDir: 'dist',
        
        // Generate sourcemaps for production debugging (disable for smaller bundles)
        sourcemap: false,
        
        // Minification options
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true, // Remove console.log
                drop_debugger: true, // Remove debugger statements
                pure_funcs: ['console.log'], // Remove specific functions
                passes: 2 // Multiple passes for better compression
            },
            mangle: {
                safari10: true // Fix Safari 10 issues
            },
            format: {
                comments: false // Remove comments
            }
        },
        
        // Chunk size warning limit (500kb)
        chunkSizeWarningLimit: 500,
        
        // Code splitting strategy
        rollupOptions: {
            output: {
                // Manual chunks for better caching
                manualChunks: {
                    // Vendor chunks
                    'react-vendor': ['react', 'react-dom', 'react-router-dom'],
                    'ui-vendor': ['lucide-react'],
                    // Separate chunk for config files
                    'config': [
                        './src/config/index.js',
                        './src/config/app.js',
                        './src/config/company.js',
                        './src/config/contact.js',
                        './src/config/services.js'
                    ],
                    // Utilities chunk
                    'utils': [
                        './src/utils/helpers.js',
                        './src/utils/consultationStorage.js',
                        './src/utils/emailService.js'
                    ]
                },
                // Naming strategy for chunks
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
                assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
            },
            // Tree-shaking options
            treeshake: {
                moduleSideEffects: false,
                propertyReadSideEffects: false,
                tryCatchDeoptimization: false
            }
        },
        
        // CSS code splitting
        cssCodeSplit: true,
        
        // Enable asset inlining for small files
        assetsInlineLimit: 4096,
        
        // Optimize dependencies
        commonjsOptions: {
            include: [/node_modules/],
            transformMixedEsModules: true
        },
        
        // Report compressed size
        reportCompressedSize: true,
        
        // Target modern browsers for smaller output
        target: 'es2015',
        
        // Module preload polyfill (updated syntax)
        modulePreload: {
            polyfill: true
        }
    },

    // Development server optimizations
    server: {
        port: 5173,
        strictPort: false,
        host: true,
        // Enable HMR
        hmr: {
            overlay: true
        },
        // Warm up frequently used files
        warmup: {
            clientFiles: [
                './src/App.jsx',
                './src/main.jsx',
                './src/components/**/*.jsx'
            ]
        }
    },

    // Preview server options
    preview: {
        port: 4173,
        strictPort: false,
        host: true
    },

    // Optimization options
    optimizeDeps: {
        // Pre-bundle dependencies
        include: [
            'react',
            'react-dom',
            'react-router-dom',
            'lucide-react'
        ],
        // Exclude from pre-bundling
        exclude: [],
        // Force optimization
        force: false
    },

    // Performance hints
    performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
});