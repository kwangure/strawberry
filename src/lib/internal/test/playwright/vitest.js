// FIXME: Do proper types
// @ts-nocheck
import { beforeAll, beforeEach, expect } from 'vitest';
import { chromium } from 'playwright';
import { createQueries } from 'sitgent/queries';
import { matchers } from 'sitgent/matchers';

/**
 * @type {import("playwright").Browser}
 */
export let browser;
/**
 * @type {import("playwright").Page}
 */
export let page;
/**
 * @type {any}
 */
export let queries;
export { expect };

export let baseUrl = `${process.env.VITE_SERVER_PROTOCOL}${process.env.VITE_SERVER_HOST}:${process.env.VITE_SERVER_PORT}`;

expect.extend(matchers);

beforeAll(async () => {
	browser = await chromium.launch();
	return async () => {
		await browser.close();
	};
}, Infinity);


beforeEach(async () => {
	const defaultContextOptions = chromium._defaultContextOptions;
	const context = await browser._newContextForReuse(defaultContextOptions);
	([page] = context.pages());
    if (!page) page = await context.newPage();
	await page.setViewportSize({ width: 1280, height: 800 });
	queries = await createQueries(page);
}, Infinity);
