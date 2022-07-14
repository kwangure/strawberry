import { spawn as _spawn } from 'child_process';

const installing = new Map();
export default function install(pkg, dev) {
	if (installing.has(pkg)) {
		installing.get(pkg).kill('SIGINT');
	}
	console.log('starting install');

	const flags = dev ? '-D' : '';
	const installProcess = _spawn('npm', ['install', flags, pkg]);
	installing.set(pkg, installProcess);

	installProcess.stdout.on('data', (output) => {
		console.log(output.toString());
	});

	installProcess.stderr.on('data', (output) => {
		console.error(output.toString());
	});

	return new Promise((resolve) => {
		installProcess.on('exit', (code) => {
			installing.delete(pkg);
			console.log(`Child exited with code ${code}`);
			resolve(code);
		});
		installProcess.on('error', (error) => {
			installing.get(pkg).kill('SIGINT');
			installing.delete(pkg);
			console.error(error);
			resolve(error.code ?? 1);
		});
	});
}
