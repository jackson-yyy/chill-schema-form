/**
 * Run Rollup in watch mode for development
 */

const execa = require('execa')
const args = require('minimist')(process.argv.slice(2))
const { getTarget } = require('./utils')
const pkgName = args._.length ? args._[0] : '@chill-schema-form/core'
const targetPath = getTarget(pkgName)?.path

execa(
	'rollup',
	[
		'-wc',
		'--environment',
		[
			`TARGET_PATH:${targetPath}`
		].join(',')
	],
	{
		stdio: 'inherit'
	}
)
