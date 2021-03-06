import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import filesize from 'rollup-plugin-filesize'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'

import { RollupOptions, Plugin } from 'rollup'
import path from 'path'
import { getPkgRoot } from './utils'

const extensions = ['.js', '.ts', '.tsx', '.vue']

// const outputFormats: ModuleFormat[] = ['esm', 'cjs', 'umd']

// export function getOutputConfig(dirPath = '', name = ''): OutputOptions[] {
//   return outputFormats.map(format => ({
//     file: path.resolve(dirPath, `dist/index.${format}.js`),
//     format,
//     name,
//     exports: 'named',
//   }))
// }

export function getRollupConfig({ pkg = '', output = 'index.js' }, config: RollupOptions = {}): RollupOptions[] {
  const pkgRoot = getPkgRoot(pkg)
  const { plugins = [], ...others } = config
  return [
    {
      input: path.resolve(pkgRoot, 'src/index.ts'),
      plugins: [
        nodeResolve({
          extensions,
        }),
        commonjs(),
        peerDepsExternal() as unknown as Plugin,

        ...plugins,
        typescript({
          tsconfigOverride: {
            include: [`packages/${pkg}/src/**/*`],
          },
        }),
        terser(),
        filesize(),
      ],
      output: {
        file: path.resolve(pkgRoot, output),
        format: 'es',
        exports: 'named',
      },
      ...others,
    },
  ]
}
