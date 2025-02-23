// import { defineConfig } from "vite";
// import ssr from "vike/plugin";
// import react from "@vitejs/plugin-react";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), ssr()],
//   ssr: {
//     noExternal: ["styled-components", "@emotion/*"],
//   },
// });

import { defineConfig } from "vite";
import commonjs from "vite-plugin-commonjs";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), commonjs()],
});
