import path from 'path'

import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import ts from 'rollup-plugin-typescript2'
import scss from 'rollup-plugin-scss'
import commonjs from 'rollup-plugin-commonjs'
import vuePlugin from 'rollup-plugin-vue'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import filesize from 'rollup-plugin-filesize'
import alias from 'rollup-plugin-alias'
import { terser } from 'rollup-plugin-terser'

const resolvePath = name => path.resolve(__dirname, name)
const extensions = ['.js', '.ts', '.tsx', '.vue']
const pkgName = 'ChillSchemaForm'

const outputConfigs = {
	'esm-bundler': {
		file: resolvePath(`dist/${pkgName}.esm-bundler.js`),
		format: 'es'
	},
	'cjs': {
		file: resolvePath(`dist/${pkgName}.cjs.js`),
		format: 'cjs'
	}
}

const defaultFormats = ['esm-bundler', 'cjs']
const packageConfigs = defaultFormats

const createConfig = (format, output) => {
	if (!output) {
		console.log(require('chalk').yellow(`invalid format: "${format}"`))
		process.exit(1)
	}
	return {
		input: 'src/index.ts',
		external: ['vue'],
		plugins: [
			peerDepsExternal(),
			vuePlugin({
				css: true
			}),
			ts({
				tsconfig: resolvePath('./tsconfig.json'),
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
					['@babel/plugin-proposal-class-properties', { loose: true }],
					['@babel/plugin-proposal-decorators', { legacy: true }],
					['@babel/plugin-transform-runtime']
				]
			}),
			resolve({
				extensions
			}),
			scss(),
			filesize(),
			alias({
				'@': resolvePath('src')
			}),
			terser()
		],
		output: {
			...output,
			sourcemap: false,
			name: 'ChillSchemaForm'
		},
	}
}


export default packageConfigs.map(format => createConfig(format, outputConfigs[format]))
