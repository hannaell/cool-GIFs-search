const browsersync = require("rollup-plugin-browsersync");
const postcss = require("rollup-plugin-postcss");
const postcssNormalize = require("postcss-normalize");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const babel = require("rollup-plugin-babel");
const noderesolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const {terser} = require("rollup-plugin-terser");
const filesize = require("rollup-plugin-filesize");

const isProduction = process.env.NODE_ENV === "production";
const isDevelopment = isProduction === false;

module.exports = {
  input: "src/scripts/index.js",
  output: {
    file: "public/giphy.js",
    format: "iife",
    sourcemap: true
  },

  plugins: [
    postcss({
      extract: true,
      plugins: [
        postcssNormalize(),
        autoprefixer(),
        cssnano()
      ],
      sourceMap: isDevelopment,
    }),
    commonjs(),
    noderesolve(),
    babel(),
    (isProduction && terser()),
    (isDevelopment && browsersync({ server: "public" })),
    filesize()
  ],
};
