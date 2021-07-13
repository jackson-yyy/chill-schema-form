/**
 * Run Rollup in watch mode for development
 */

const execa = require('execa')

execa(
	'rollup',
	[
		'-wc'
	],
	{
		stdio: 'inherit'
	}
)
