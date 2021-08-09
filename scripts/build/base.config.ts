import babel from '@rollup/plugin-babel'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import filesize from 'rollup-plugin-filesize'
import { terser } from 'rollup-plugin-terser'

import { ModuleFormat, RollupOptions, OutputOptions, Plugin } from 'rollup'
import path from 'path'

const extensions = ['.js', '.ts', '.tsx', '.vue']

const outputFormats: ModuleFormat[] = ['esm', 'cjs', 'umd']

export function getBabelConfig({ presets = [], plugins = [] }: { presets?: any[]; plugins?: any[] }) {
  return babel({
    exclude: 'node_modules/**',
    presets: ['@babel/preset-env', '@babel/preset-typescript', ...presets],
    plugins,
    extensions,
  })
}

export function getOutputConfig(dirPath = '', name = ''): OutputOptions[] {
  return outputFormats.map(format => ({
    file: path.resolve(dirPath, `dist/index.${format}.js`),
    format,
    name,
    exports: 'named',
  }))
}

export function getRollupConfig(dirPath = '', name = '', config: RollupOptions = {}): RollupOptions {
  const { plugins = [], ...others } = config
  return {
    input: path.resolve(dirPath, 'src/index.ts'),
    plugins: [
      nodeResolve({
        extensions,
      }),
      peerDepsExternal() as unknown as Plugin,
      commonjs(),
      ...plugins,
      // terser(),
      filesize(),
    ],
    output: getOutputConfig(dirPath, name),
    ...others,
  }
}
