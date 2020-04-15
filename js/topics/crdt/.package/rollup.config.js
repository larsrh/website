import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default [
  {
    input: "fast-check",
    output: {
      file: "dist/fc.js",
      format: "umd",
      name: "fc"
    },
    plugins: [resolve(), commonjs()]
  },
  {
    input: "index.js",
    output: {
      file: "dist/chai.js",
      format: "umd",
      name: "chai"
    },
    plugins: [resolve(), commonjs()]
  }
]
