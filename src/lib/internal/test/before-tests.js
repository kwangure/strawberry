// FIXME: Do proper types
// @ts-nocheck
import { beforeAll, beforeEach, expect } from 'vitest';
import { chromium } from 'playwright';

/**
 * @type {import('playwright').Browser}
 */
export let browser;

beforeAll(async () => {
	browser = await chromium.launch({ headless: true });

	return async () => {
		await Promise.all([
			browser.close(),
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
});
