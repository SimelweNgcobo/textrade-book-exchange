import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(
    Boolean,
  ),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize build output
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks for better caching
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          ui: [
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-toast",
          ],
          supabase: ["@supabase/supabase-js"],
          utils: ["clsx", "tailwind-merge", "date-fns"],
          // University data in separate chunk (removed logos to reduce size)
          university: ["src/constants/universities"],
        },
        // Add hash to filenames for cache busting
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
    // Optimize chunk size warning limit
    chunkSizeWarningLimit: 800, // Reduced for better performance
    // Enable source maps for debugging
    sourcemap: mode === "development",
    // Enhanced minification for production
    minify: mode === "production" ? "terser" : false,
    terserOptions:
      mode === "production"
        ? {
            compress: {
              drop_console: true, // Remove console.logs in production
              drop_debugger: true,
              pure_funcs: ["console.log", "console.debug"], // Remove specific console calls
            },
          }
        : undefined,
    // Target modern browsers for better performance
    target: "es2020", // More compatible than esnext
    // Enable CSS code splitting
    cssCodeSplit: true,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "@supabase/supabase-js",
    ],
  },
}));
