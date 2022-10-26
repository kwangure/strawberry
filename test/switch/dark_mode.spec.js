import { describe, it } from 'vitest';
import '$lib/internal/test/playwright/vitest.js';

describe('Dark mode switch', async () => {
	it('is light in lightmode', async (context) => {
		const { baseUrl, expect, page } = context;
		await page.emulateMedia({ colorScheme: 'light' });
		await page.goto(`${baseUrl}/test/components/switch/darkmode`);
		// Wait for animation to finish
		await new Promise(r => setTimeout(r, 500));
		const image = await page.locator('#test-switches').screenshot();
		expect(image).toMatchImageSnapshot();
	});
	it('is dark in darkmode', async (context) => {
		const { baseUrl, expect, page } = context;
		await page.emulateMedia({ colorScheme: 'dark' });
		await page.goto(`${baseUrl}/test/components/switch/darkmode`);
		// Wait for animation to finish
		await new Promise(r => setTimeout(r, 500));
		const image = await page.locator('#test-switches').screenshot();
		expect(image).toMatchImageSnapshot();
	});
});
