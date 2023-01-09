import fs from 'fs';
import path from 'path';

/**
 * A Vite plugin to generate the repo README dynamically
 * @param {{ input: string, outputDir?: string }} options
 * @returns {import("vite").Plugin}
 */
export function readme(options = {}) {
	/** @type {import('vite').ViteDevServer} */
	let vite;
	/** @type {import('vite').ResolvedConfig} */
	let config;
	return {
		name: 'vite-plugin-readme',
		configResolved(_config) {
			config = _config;
		},
		configureServer(server) {
			vite = server;
		},
		async buildStart() {
			const { id } = await this.resolve(options.input);
			const markdoc = config.plugins.find((p) => p.name === 'vite-plugin-markdoc');
			if (!markdoc) throw Error('\'vite-plugin-markdoc\' is missing.');

			const pluginContext = this;
			async function generateReadme() {
				const code = fs.readFileSync(id, 'utf-8');
				const result = await markdoc.transform.call(pluginContext, code, `${id}?markdown=true`);
				const outputDir = options.outputDir || config.root;
				const module = await stringToModule(result, outputDir);
				const rootInputPath = id
					.replace(config.root, '')
					.replace(/^\//, '');
				const markdown = `
<!--
	This document is generated from '${rootInputPath}'. Do not edit it directly.
-->
${module.markdown}
`;
				const readmeOutputPath = path.resolve(outputDir, './README.md');
				fs.writeFileSync(readmeOutputPath, markdown);
			}

			generateReadme();

			// Only exists in dev mode
			vite?.watcher?.on('change', (path) => {
				if (path === id) {
					generateReadme();
				}
			});
		},
	};
}

async function stringToModule(code, tmp) {
	const tempOutput = path.resolve(tmp, `readme-${(new Date()).getTime()}.mjs`);
	fs.writeFileSync(tempOutput, code);
	const module = await import(tempOutput);
	fs.unlinkSync(tempOutput);
	return module;
}
