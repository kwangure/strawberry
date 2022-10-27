// FIXME: Do proper types
// @ts-nocheck
import { beforeAll, beforeEach, expect } from 'vitest';
import { chromium } from 'playwright';
import { createServer } from 'vite';
import { matchers } from 'sitgent/matchers';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

/**
 * @type {import('playwright').Browser}
 */
export let browser;

/**
 * @type {import('vite').ViteDevServer}
 */
export let server;

beforeAll(async () => {
	expect.extend({
		...matchers,
		toMatchImageSnapshot,
	});

	browser = await chromium.launch();
	server = await createServer({
		server: { port: 1337 }
	});
	await server.listen();

	return async () => {
		await Promise.all([
			browser.close(),
			server.close(),
		])
	};
});

beforeEach(async (context) => {
	const defaultContextOptions = chromium._defaultContextOptions;
	const browserContext = await browser._newContextForReuse(defaultContextOptions);
	const page = browserContext.pages()[0]
		|| await browserContext.newPage();
	await page.setViewportSize({ width: 1280, height: 800 });

	context.baseUrl = process.env.VITE_BASE_URL;
	context.browser = browser;
	context.page = page;
	context.server = server;
});
