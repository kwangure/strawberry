// FIXME: Do proper types
// @ts-nocheck
import { beforeAll, beforeEach, expect } from 'vitest';
import { chromium } from 'playwright';
import { matchers } from 'sitgent/matchers';
import { toMatchImageSnapshot } from 'jest-image-snapshot'

/**
 * @type {import("playwright").Browser}
 */
export let browser;

beforeAll(async () => {
	expect.extend({
		...matchers,
		toMatchImageSnapshot,
	});
	browser = await chromium.launch();

	return async () => {
		await browser.close();
	};
}, Infinity);

beforeEach(async (context) => {
	const defaultContextOptions = chromium._defaultContextOptions;
	const browserContext = await browser._newContextForReuse(defaultContextOptions);
	const page = browserContext.pages()[0]
		|| await browserContext.newPage();
	await page.setViewportSize({ width: 1280, height: 800 });
	context.page = page;
	context.baseUrl = `${process.env.VITE_SERVER_PROTOCOL}${process.env.VITE_SERVER_HOST}:${process.env.VITE_SERVER_PORT}`;
}, Infinity);
