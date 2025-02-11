// vite.config.ts
import path from "path";
import {
  defineConfig
} from "file:///D:/code/Git/Msg-Pilot/node_modules/vite/dist/node/index.js";
import react from "file:///D:/code/Git/Msg-Pilot/node_modules/@vitejs/plugin-react/dist/index.mjs";
import legacy from "file:///D:/code/Git/Msg-Pilot/node_modules/@vitejs/plugin-legacy/dist/index.mjs";
var __vite_injected_original_dirname = "D:\\code\\Git\\Msg-Pilot\\apps\\portal";
var vite_config_default = defineConfig({
  plugins: [
    legacy({
      targets: ["defaults"]
    }),
    react()
  ],
  build: {
    outDir: path.resolve(
      process.env.INIT_CWD || "./",
      "./dist/msg-pilot"
    )
  },
  server: {
    host: "0.0.0.0"
  },
  resolve: {
    alias: {
      "@": path.resolve(
        __vite_injected_original_dirname,
        "./src"
      )
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjb2RlXFxcXEdpdFxcXFxNc2ctUGlsb3RcXFxcYXBwc1xcXFxwb3J0YWxcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNvZGVcXFxcR2l0XFxcXE1zZy1QaWxvdFxcXFxhcHBzXFxcXHBvcnRhbFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovY29kZS9HaXQvTXNnLVBpbG90L2FwcHMvcG9ydGFsL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCB7XG4gIGRlZmluZUNvbmZpZyxcbn0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCBsZWdhY3kgZnJvbSAnQHZpdGVqcy9wbHVnaW4tbGVnYWN5J1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgbGVnYWN5KHtcbiAgICAgIHRhcmdldHM6IFsnZGVmYXVsdHMnXSxcbiAgICB9KSxcbiAgICByZWFjdCgpLFxuICBdLFxuICBidWlsZDoge1xuICAgIG91dERpcjogcGF0aC5yZXNvbHZlKFxuICAgICAgcHJvY2Vzcy5lbnYuSU5JVF9DV0QgfHwgJy4vJyxcbiAgICAgICcuL2Rpc3QvbXNnLXBpbG90JyxcbiAgICApLFxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiAnMC4wLjAuMCcsXG4gIH0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoXG4gICAgICAgIF9fZGlybmFtZSxcbiAgICAgICAgJy4vc3JjJyxcbiAgICAgICksXG4gICAgfSxcbiAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWlTLE9BQU8sVUFBVTtBQUNsVDtBQUFBLEVBQ0U7QUFBQSxPQUNLO0FBQ1AsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sWUFBWTtBQUxuQixJQUFNLG1DQUFtQztBQU96QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxTQUFTLENBQUMsVUFBVTtBQUFBLElBQ3RCLENBQUM7QUFBQSxJQUNELE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxRQUFRLEtBQUs7QUFBQSxNQUNYLFFBQVEsSUFBSSxZQUFZO0FBQUEsTUFDeEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSztBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
