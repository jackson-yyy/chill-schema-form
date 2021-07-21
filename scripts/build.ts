const chalk = require('chalk')
const execa = require('execa')
const args = require('minimist')(process.argv.slice(2))
const targets = args._
const { packages: allTargets, getTarget } = require('./utils')

async function run () {
	console.log(chalk.bold(chalk.yellow(`start run build`)));

	/*default build all targets*/
	if (!targets.length) {
		await buildAll(allTargets)
	} else {
		/*if has args, only build args targets*/
		await buildAll(targets)
	}

	console.log(chalk.bold(chalk.yellow(`package build success`)));
}

async function buildAll (targets) {
	const ret = []
	for (const target of targets) {
		const p = Promise.resolve().then(() => build(getTarget(target)))
		ret.push(p)
	}

	return Promise.all(ret)
}

async function build (target) {
	await execa(
		'rollup',
		[
			'-c',
			'--environment',
			[
				`TARGET_PATH:${target.path}`
			].join(',')
		],
		{ stdio: 'inherit' }
	)
}

run()
