
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

/**
 * Vite configuration
 * 
 * This configuration sets up:
 * 1. Development server settings (host and port)
 * 2. React SWC plugin for fast refresh and JSX transformation
 * 3. Path aliases for simpler imports (@ points to src directory)
 * 
 * @see https://vitejs.dev/config/
 */
export default defineConfig(({ mode }) => ({
  server: {
    host: "::", // Listen on all IPv6 interfaces (includes IPv4)
    port: 8080,  // Default development port
  },
  plugins: [
    react(), // Add React SWC plugin
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Create @ alias for src directory
    },
  },
}));
