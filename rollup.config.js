import path from 'path'

import babel from '@rollup/plugin-babel'
import nodeResolve from '@rollup/plugin-node-resolve'
import ts from 'rollup-plugin-typescript2'
import scss from 'rollup-plugin-scss'
import commonjs from 'rollup-plugin-commonjs'
import vuePlugin from 'rollup-plugin-vue'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import filesize from 'rollup-plugin-filesize'
import alias from 'rollup-plugin-alias'
import { terser } from 'rollup-plugin-terser'

/* get path from root */
const rootResolve = name => path.resolve(__dirname, name)
const extensions = ['.js', '.ts', '.tsx', '.vue']

/*package variable*/
const packageDir = process.env.TARGET_PATH
const resolve = p => path.resolve(packageDir, p)
const pkg = require(resolve('package.json'))
const packageOptions = pkg.buildOptions || {}
/*package name*/
const pkgName = packageOptions.name
const baseName = path.basename(packageDir)

/*config*/
const outputConfigs = {
	'esm-bundler': {
		file: resolve(`dist/${pkgName}.esm-bundler.js`),
		format: 'es'
	},
	'cjs': {
		file: resolve(`dist/${pkgName}.cjs.js`),
		format: 'cjs'
	},
	'umd': {
		file: resolve(`dist/${pkgName}.umd.js`),
		format: 'umd'
	}
}
const defaultFormats = ['esm-bundler', 'cjs', 'umd']
const packageConfigs = defaultFormats

const createConfig = (format, output) => {
	if (!output) {
		console.log(require('chalk').yellow(`invalid format: "${format}"`))
		process.exit(1)
	}
	return {
		input: resolve(`lib/${baseName}`),
		external: ['vue'],
		plugins: [
			peerDepsExternal(),
			vuePlugin({
				css: true
			}),
			ts({
				tsconfig: rootResolve('tsconfig.json'),
				extensions
			}),
			commonjs(),
			babel({
				exclude: 'node_modules/**',
				presets: [
					'@babel/preset-env',
					'@babel/preset-typescript'
				],
				plugins: [
					['@babel/plugin-proposal-decorators', { legacy: true }],
					['@babel/plugin-transform-runtime']
				],
				babelHelpers: 'runtime'
			}),
			nodeResolve({
				extensions
			}),
			scss(),
			filesize(),
			alias({
				'@': rootResolve('src'),
				'@core': rootResolve('packages/core'),
				'@view': rootResolve('packages/view')
			}),
			terser()
		],
		output: {
			...output,
			sourcemap: false,
			name: pkgName
		}
	}
}

export default packageConfigs.map(format => createConfig(format, outputConfigs[format]))
