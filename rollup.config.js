// @ts-nocheck
import svelte from 'rollup-plugin-svelte'
import resolve from 'rollup-plugin-node-resolve'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'

import typescript from 'rollup-plugin-typescript2'

import { createEnv, readConfigFile } from '@pyoner/svelte-ts-preprocess'

const production = !process.env.ROLLUP_WATCH
const widget = process.env.WIDGET
const env = createEnv()
const compilerOptions = readConfigFile(env)
const opts = {
  env,
  compilerOptions: {
    ...compilerOptions,
    allowNonTsExtensions: true
  }
}

export default {
  input: `client/${widget}/src/index.ts`,
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: `public/assets/js/${widget}.js`
  },
  plugins: [
    svelte({
      dev: !production
    }),

    resolve(),
    typescript({ tsconfig: 'svelte-tsconfig.json' }),

    !production && livereload('public'),
    production && terser()
  ],
  watch: {
    clearScreen: false
  }
}
