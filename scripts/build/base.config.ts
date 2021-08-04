import babel from '@rollup/plugin-babel'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import ts from 'rollup-plugin-typescript2'
import scss from 'rollup-plugin-scss'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import filesize from 'rollup-plugin-filesize'
import { terser } from 'rollup-plugin-terser'

import { ModuleFormat, RollupOptions, OutputOptions } from 'rollup'
import path from 'path'

const extensions = ['.js', '.ts', '.tsx', '.vue']

const outputFormats: ModuleFormat[] = ['esm', 'cjs', 'umd']

export function getOutputConfig(dirPath = '', name = ''): OutputOptions[] {
  return outputFormats.map(format => ({
    file: path.resolve(dirPath, `dist/index.${format}.js`),
    format,
    name,
    exports: 'named'
  }))
}

export function getRollupConfig(dirPath = '', name = '', config: RollupOptions = {}): RollupOptions  {
  const { plugins = [], ...others } = config
  return {
    input: path.resolve(dirPath, 'src/index.ts'),
    plugins: [
      peerDepsExternal() as Plugin,
      ts(),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
        presets: ['@babel/preset-env', '@babel/preset-typescript'],
        plugins: [['@babel/plugin-proposal-decorators', { legacy: true }], ['@babel/plugin-transform-runtime']],
        babelHelpers: 'runtime',
      }),
      nodeResolve({
        extensions
      }),
      scss(),
      filesize(),
      terser(),
      ...plugins,
    ],
    output: getOutputConfig(dirPath, name),
    ...others,
  }
}
