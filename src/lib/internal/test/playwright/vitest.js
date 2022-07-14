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

expect.extend(matchers);

beforeAll(async () => {
	browser = await chromium.launch();
	return async () => {
		await browser.close();
	};
}, Infinity);


beforeEach(async () => {
	page = await browser.newPage();
	await page.goto('about:blank');
	await page._resetForReuse();
	await page.context()._resetForReuse();
	await page.setViewportSize({ width: 1280, height: 800 });
	queries = await createQueries(page);
}, Infinity);
