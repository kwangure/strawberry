import { describe, it } from 'vitest';
import '$lib/internal/test/playwright/vitest.js';

describe('Dark mode button', async () => {
	it('is light in lightmode', async (context) => {
		const { baseUrl, expect, page } = context;
		await page.emulateMedia({ colorScheme: 'light' });
		await page.goto(`${baseUrl}/test/components/button/darkmode`);
		const image = await page.locator("#test-button").screenshot();
		expect(image).toMatchImageSnapshot();
	});
	it('is dark in darkmode', async (context) => {
		const { baseUrl, expect, page } = context;
		await page.emulateMedia({ colorScheme: 'dark' });
		await page.goto(`${baseUrl}/test/components/button/darkmode`);
		const image = await page.locator("#test-button").screenshot();
		expect(image).toMatchImageSnapshot();
	});
});
