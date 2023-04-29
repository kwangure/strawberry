import { plugin as docs } from "@kwangure/svelte-docs";
import inspect from 'vite-plugin-inspect';
import localPackageWatch from './scripts/local-pkg-watch/index.js';
import { markdoc } from 'sveltekit-markdoc';
import path from 'path';
import sharedMarkdocConfig from './markdoc.config.js';
import { sveltekit } from '@sveltejs/kit/vite';
import { readme } from "./scripts/vite-plugin-readme.js";

const _filename = new URL(import.meta.url).pathname;
const _dirname = path.dirname(_filename);

function resolve(pathname) {
	return path.resolve(_dirname, pathname);
}

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		docs(),
		inspect(),
		localPackageWatch(),
		markdoc({
			transformConfig: sharedMarkdocConfig,
		}),
		sveltekit(),
		{
			name: 'playwright',
			configResolved(config) {
				const protocol = config.server.https ? 'https://' : 'http://';
				const host = config.server.host ?? 'localhost';
				const port = config.server.port ?? 5173;
				process.env.VITE_BASE_URL = `${protocol}${host}:${port}`
			},
		},
		readme({
			input: 'src/README_TEMPLATE.md',
		}),
	],
	resolve: {
		alias: {
			'@kwangure/strawberry/css/styles': resolve('./src/lib/css/styles.js'),
		},
	},
	server: {
		fs: {
			allow: ['./docs'],
		},
	},
	test: {
		globalSetup: './test/setup.js',
	},
};

export default config;
