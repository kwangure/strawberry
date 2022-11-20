import fs from 'fs';
import install from './install.js';

export default function localPackageWatch(_options = {}) {
	return {
		configureServer(server) {
			const pkg = JSON.parse(fs.readFileSync('./package.json'));
			const { dependencies, devDependencies } = pkg;
			const deps = Object.assign({}, dependencies, devDependencies);
			const local = Array.from(Object.values(deps))
				.filter((dep) => dep.startsWith('file:'))
				.map((f) => f.slice('file:'.length));
			server.watcher.add(local);
			server.watcher.on('change', (path, _stats) => {
				if (local.includes(path)) {
					const isDevDependency = Array
						.from(Object.values(pkg.devDependencies))
						.includes(`file:${path}`);
					install(path, isDevDependency);

					// Necessary e.g. if file is Vite plugin
					server.restart();
				}
			});
		},
	};
}
