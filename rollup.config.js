import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from '@rollup/plugin-typescript';
import postcss from "rollup-plugin-postcss";
import copy from "rollup-plugin-copy";

const packageJson = require("./package.json");

export default {
  input: "src/index.ts",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript(),
    postcss(),
    copy({
      targets: [
        {
          src: "src/css",
          dest: "build",
        },
        {
          src: "src/fonts",
          dest: "build",
        },
        {
          src: "src/lib/next.js",
          dest: "build",
          rename: "next.js"
        }
      ]
    })
  ]
};
