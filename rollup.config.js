import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import generatePackageJson from 'rollup-plugin-generate-package-json';
import external from 'rollup-plugin-peer-deps-external';
import copy from 'rollup-plugin-copy'
import pkg from "./package.json";

const moduleName = pkg.name.replace(/^@.*\//, "");
const author = pkg.author;
const banner = `
  /**
   * @license
   * author: ${author}
   * ${moduleName}.js v${pkg.version}
   * Released under the ${pkg.license} license.
   */
`;
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  input: "./src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      banner,
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "esm",
      sourcemap: true,
      banner,
      exports: "named",
    }
  ],
  plugins: [
    
    generatePackageJson({
      baseContents: {
        name: pkg.name,
        version:pkg.version,
        main:pkg.main,
        private: false,
        dependencies:pkg.dependencies,
        peerDependencies: pkg.peerDependencies
      }
    }),
    // alias({entries: {
    //   'styled-components': '../node_modules/styled-components'
    // }}),
    external(),
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' }),
    postcss(),
    copy({
      targets: [
        { src: 'README.md', dest: 'build' },
      ]
    })
    // terser()
  ]
};
