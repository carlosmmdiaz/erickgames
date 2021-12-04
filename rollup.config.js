import { nodeResolve } from "@rollup/plugin-node-resolve";
import copy from "rollup-plugin-copy-assets";
import { terser } from "rollup-plugin-terser";

export default {
  input: "index.js",
  output: {
    dir: "dist",
    format: "es",
  },
  plugins: [
    nodeResolve(),
    terser(),
    copy({
      assets: [
        "./packages/memory-game/assets",
        "./index.html",
        "./android-chrome-192x192.png",
        "./android-chrome-512x512.png",
        "./apple-touch-icon.png",
        "./browserconfig.xml",
        "./favicon-16x16.png",
        "./favicon-32x32.png",
        "./favicon.ico",
        "./mstile-150x150.png",
        "./safari-pinned-tab.svg",
        "./site.webmanifest",
      ],
    }),
  ],
};
