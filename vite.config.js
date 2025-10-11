import react from '@vitejs/plugin-react-swc'
import path from 'path'
import url from 'url'
import { defineConfig } from 'vite'
import { viteStaticCopy } from "vite-plugin-static-copy"

const PYODIDE_EXCLUDE = [
  "!**/*.{md,html}",
  "!**/*.d.ts",
  "!**/*.whl",
  "!**/node_modules",
];

export function viteStaticCopyPyodide() {
  const pyodideDir = path.dirname(url.fileURLToPath(import.meta.resolve("pyodide")))
  return viteStaticCopy({
    targets: [
      {
        src: [path.join(pyodideDir, "*")].concat(PYODIDE_EXCLUDE),
        dest: "assets",
      },
    ],
  })
}

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ["pyodide"]
  },
  plugins: [react(), viteStaticCopyPyodide()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    }
  },
})
