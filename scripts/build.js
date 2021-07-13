const chalk = require('chalk')
const execa = require('execa')

async function run () {
	console.log(chalk.bold(chalk.yellow(`start run build`)));
	await build()
	console.log(chalk.bold(chalk.yellow(`package build success`)));
}

async function build () {
	await execa(
		'rollup',
		[
			'-c'
		],
		{ stdio: 'inherit' }
	)
}

run()
