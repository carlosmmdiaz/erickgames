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
        "./packages/memorY/assets",
        "./index.html",
        "./assets/favicons",
        "./browserconfig.xml",
        "./service-worker.js",
        "./site.webmanifest",
      ],
    }),
  ],
};
