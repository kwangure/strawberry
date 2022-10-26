import { plugin as docs } from "@kwangure/svelte-docs";
import inspect from 'vite-plugin-inspect';
import localPackageWatch from './scripts/local-pkg-watch/index.js';
import path from 'path';
import { sveltekit } from '@sveltejs/kit/vite';

const _filename = new URL(import.meta.url).pathname;
const _dirname = path.dirname(_filename);

function resolve(pathname) {
	return path.resolve(_dirname, pathname);
}

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		docs(),
		// TODO: Enable for dev only
		// inspect(),
		localPackageWatch(),
		sveltekit(),
		{
			configResolved(config) {
				const protocol = config.server.https ? 'https://' : 'http://';
				const host = config.server.host ?? 'localhost';
				const port = config.server.port ?? 5173;
				process.env.VITE_BASE_URL = `${protocol}${host}:${port}`
			},
		}
	],
	resolve: {
		alias: {
			'@kwangure/strawberry/css/styles': resolve('./src/lib/css/styles.js'),
		},
	},
};

export default config;
